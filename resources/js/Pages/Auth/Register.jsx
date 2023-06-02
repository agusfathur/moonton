import React, { useEffect } from 'react';
import Button from '@/Components/Button';
import Input from '@/Components/Input';
import Label from '@/Components/Label';
import ValidationErrors from '@/Components/ValidationErrors';
import { Head, Link, useForm } from '@inertiajs/inertia-react';

const Register = () => {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });
    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('register'));
    };
    return (
        <>
            {/* dinamic title  */}
            <Head title="Sign Up" />
            <div className="mx-auto max-w-screen min-h-screen bg-black text-white md:px-10 px-3">
                <div className="fixed top-[-50px] hidden lg:block">
                    <img src="/images/signup-image.png"
                        className="hidden laptopLg:block laptopLg:max-w-[450px] laptopXl:max-w-[640px]" alt="" />
                </div>
                <div className="py-24 flex laptopLg:ml-[680px] laptopXl:ml-[870px]">
                    <div>
                        <img src="/images/moonton-white.svg" alt="" />
                        <div className="my-[70px]">
                            <div className="font-semibold text-[26px] mb-3">
                                Sign Up
                            </div>
                            <p className="text-base text-[#767676] leading-7">
                                Explore our new movies and get <br />
                                the better insight for your life
                            </p>
                            <ValidationErrors errors={errors} />
                        </div>
                        <form className="w-[370px]" onSubmit={submit}>
                            <div className="flex flex-col gap-6">
                                <div>
                                    <Label
                                        forInput={'name'}
                                        value={'Name'}
                                    />
                                    <Input
                                        type={"text"}
                                        name={"name"}
                                        placeholder={"Your Fullname"}
                                        value={data.name}
                                        isFocused={true}
                                        handleChange={onHandleChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <Label
                                        forInput={"email"}
                                        value={"Email Address"}
                                    />
                                    <Input
                                        type={"email"}
                                        name={"email"}
                                        placeholder={"example@email.com"}
                                        value={data.email}
                                        handleChange={onHandleChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <Label
                                        forInput={'password'}
                                        value={'Password'}
                                    />
                                    <Input
                                        type={"password"}
                                        name={"password"}
                                        placeholder={"Your Password"}
                                        value={data.password}
                                        handleChange={onHandleChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <Label
                                        forInput="password_confirmation" value="Confirm Password"
                                    />
                                    <Input
                                        type={"password"}
                                        name="password_confirmation"
                                        placeholder={"Your Password"}
                                        value={data.password_confirmation}
                                        handleChange={onHandleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="grid space-y-[14px] mt-[30px]">

                                <Button type={"submit"} processing={processing} >
                                    <span className="text-base font-semibold">
                                        Sign Up
                                    </span>
                                </Button>

                                <Link href={route("login")}>
                                    <Button type={"button"} variant={"light-outline"} >
                                        <span className="text-base text-white">
                                            Sign In to My Account
                                        </span>
                                    </Button>
                                </Link>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register;