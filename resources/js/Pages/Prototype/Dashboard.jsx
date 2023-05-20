import Authenticated from "@/Layouts/Authenticated/Index";
import Flickity from "react-flickity-component";
import { Head } from "@inertiajs/inertia-react";
import FeaturedMovie from "@/Components/FeaturedMovie";
import MovieCard from "@/Components/MovieCard";
const Dashboard = () => {
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
    <Authenticated>
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
          {[1, 2, 3, 4].map(i => {
            return (
              <FeaturedMovie
                key={i}
                slug={`the-batman`}
                name={`The Batman`}
                category={`comedy`}
                thumbnail={`https://picsum.photos/id/1/300/300`}
                rating={i + 1}
              />
            )
          })}
        </Flickity>
      </div>
      {/* Browse */}
      <div className="mt-[50px]" >
        <div className="font-semibold text-[22px] text-black mb-4">Browse</div>
        <Flickity className="gap-[30px]" options={flikityOptions} >
          {[1, 2, 3, 4, 5, 6].map(i => {
            return (
              <MovieCard
                key={i}
                slug={`kucing-oren`}
                name={`Kucing Oren ${i}`}
                category={`Animation`}
                thumbnail={`https://picsum.photos/id/1/300/300`}
              />
            )
          })}
        </Flickity>
      </div>
    </Authenticated>
  )
}

export default Dashboard;