<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Movie;

class MovieTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $movies = [
            [
                "name" => "Kungfu Panda",
                "slug" => "kungfu-panda",
                "category" => "Animation",
                "video_url" => "https://youtu.be/Xlgnzx5PFQU",
                "thumbnail" => "https://picsum.photos/id/1/300/300",
                "rating" => 4.3,
                "is_featured" => 1
            ],
            [
                "name" => "Kungfu Panda 2",
                "slug" => "kungfu-panda-2",
                "category" => "Animation",
                "video_url" => "https://youtu.be/Xlgnzx5PFQU",
                "thumbnail" => "https://picsum.photos/id/1/300/300",
                "rating" => 4.3,
                "is_featured" => 0
            ],
            [
                "name" => "Kungfu Panda 3",
                "slug" => "kungfu-panda-3",
                "category" => "Animation",
                "video_url" => "https://youtu.be/Xlgnzx5PFQU",
                "thumbnail" => "https://picsum.photos/id/1/300/300",
                "rating" => 4.3,
                "is_featured" => 0
            ]
        ];
        Movie::insert($movies);
    }
}
