import Authenticated from "@/Layouts/Authenticated/Index";
import Flickity from "react-flickity-component";
import { Head } from "@inertiajs/inertia-react";
import FeaturedMovie from "@/Components/FeaturedMovie";
import MovieCard from "@/Components/MovieCard";

const Dashboard = ({ auth, featuredMovies, movies }) => {
  const flikityOptions = {
    cellAlign: "left",
    contain: true,
    groupCells: 1,
    wrapAround: false,
    pageDots: false,
    prevNextButtons: false,
    draggable: ">1",
  }
  return (
    <Authenticated auth={auth}>
      <Head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/flickity@2/dist/flickity.min.css"
        />
        <title>Dashboard</title>
      </Head>
      <div>
        <div className="font-semibold text-[22px] text-black mb-4">Featured Movies</div>
        <Flickity className="gap-[30px]" options={flikityOptions}>
          {featuredMovies.map(featuredMovie => {
            return (
              <FeaturedMovie
                key={featuredMovie.id}
                slug={featuredMovie.slug}
                name={featuredMovie.name}
                category={featuredMovie.category}
                thumbnail={featuredMovie.thumbnail}
                rating={featuredMovie.rating}
              />
            )
          })}
        </Flickity>
      </div>
      {/* Browse */}
      <div className="mt-[50px]" >
        <div className="font-semibold text-[22px] text-black mb-4">Browse</div>
        <Flickity className="gap-[30px]" options={flikityOptions} >
          {movies.map(movie => {
            return (
              <MovieCard
                key={movie.id}
                slug={movie.name}
                name={movie.name}
                category={movie.category}
                thumbnail={movie.thumbnail}
              />
            )
          })}
        </Flickity>
      </div>
    </Authenticated>
  )
}

export default Dashboard;