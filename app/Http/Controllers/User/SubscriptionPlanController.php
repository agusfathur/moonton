<?php

namespace App\Http\Controllers\User;

use Midtrans;
use Carbon\Carbon;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Models\SubscriptionPlan;
use App\Models\UserSubscription;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class SubscriptionPlanController extends Controller
{

    public function __construct()
    {
        // Set your Merchant Server Key
        \Midtrans\Config::$serverKey = env('MIDTRANS_SERVERKEY');
        // Set to Development/Sandbox Environment (default). Set to true for Production Environment (accept real transaction).
        \Midtrans\Config::$isProduction = env('MIDTRANS_IS_PRODUCTION');
        // Set sanitization on (default)
        \Midtrans\Config::$isSanitized = env('MIDTRANS_IS_SANITIZED');
        // Set 3DS transaction for credit card to true
        \Midtrans\Config::$is3ds = env('MIDTRANS_IS_3DS');
    }

    public function index()
    {
        $subscriptionPlans = SubscriptionPlan::all();
        return inertia('User/Dashboard/SubscriptionPlan/Index', [
            'subscriptionPlans' => $subscriptionPlans,
            'userSubscription' => null
        ]);
    }

    public function userSubscribe(Request $request, SubscriptionPlan $subscriptionPlan)
    {
        $data = [
            'user_id' => Auth::id(),
            'subscription_plan_id' => $subscriptionPlan->id,
            'price' => $subscriptionPlan->price,
            // 'expired_date' => Carbon::now()->addMonths($subscriptionPlan->active_period_in_months),
            'payment_status' => 'pending'
        ];
        $userSubscription = UserSubscription::create($data);
        $params = [
            'transaction_details' => [
                'order_id' => $userSubscription->id . '-' . Str::random(5),
                'gross_amount' =>  $userSubscription->price,
            ]
        ];
        $snapToken = \Midtrans\Snap::getSnapToken($params);
        $userSubscription->update([
            'snap_token' => $snapToken
        ]);
        return inertia('User/Dashboard/SubscriptionPlan/Index', [
            'userSubscription' => $userSubscription
        ]);
    }
    public function midtransCallback(Request $request)
    {

        $transaction_status = $request->transaction_status;
        $fraud = $request->fraud_status;

        $transaction_id = explode('-', $request->order_id)[0];
        $userSubscription = UserSubscription::find($transaction_id);

        if ($transaction_status == 'capture') {
            if ($fraud == 'challenge') {
                // TODO Set payment status in merchant's database to 'challenge'
                $userSubscription->payment_status = 'pending';
            } else if ($fraud == 'accept') {
                // TODO Set payment status in merchant's database to 'success'
                // $userSubscription->payment_status = 'paid';
                $userSubscription->update([
                    'payment_status' => 'paid',
                    'expired_date' => Carbon::now()->addMonths((int) $userSubscription->subscriptionPlan->active_period_in_months)
                ]);
                // $userSubscription->expired_date = Carbon::now()->addMonths((int) $userSubscription->subscriptionPlan->active_period_in_months);
            }
        } else if ($transaction_status == 'cancel') {
            if ($fraud == 'challenge') {
                // TODO Set payment status in merchant's database to 'failure'
                $userSubscription->payment_status = 'failed';
            } else if ($fraud == 'accept') {
                // TODO Set payment status in merchant's database to 'failure'
                $userSubscription->payment_status = 'failed';
            }
        } else if ($transaction_status == 'deny') {
            // TODO Set payment status in merchant's database to 'failure'
            $userSubscription->payment_status = 'failed';
        } else if ($transaction_status == 'settlement') {
            // TODO set payment status in merchant's database to 'Settlement'
            $userSubscription->payment_status = 'paid';
            $userSubscription->expired_date = Carbon::now()->addMonths((int) $userSubscription->subscriptionPlan->active_period_in_months);
        } else if ($transaction_status == 'pending') {
            // TODO set payment status in merchant's database to 'Pending'
            $userSubscription->payment_status = 'pending';
        } else if ($transaction_status == 'expire') {
            // TODO set payment status in merchant's database to 'expire'
            $userSubscription->payment_status = 'failed';
        }
        $userSubscription->save();
        return response()->json([
            'status' => 'success',
            'message' => 'Payment success',
            'order_id' => $request->order_id
        ]);
    }
}
