import Button from "@/Components/Button";
import FlashMessage from "@/Components/FlashMessage";
import Authenticated from "@/Layouts/Authenticated/Index";
import { Link } from "@inertiajs/inertia-react";

const Index = ({ auth, flashMessage, movies }) => {
  return (
    <Authenticated auth={auth} >
      <Link href={route('admin.dashboard.movie.create')}>
        <Button
          type="button"
          className="mb-8 w-1/5"
        >
          Insert New Movie
        </Button>
      </Link>
      {flashMessage?.message && (
        <FlashMessage message={flashMessage.message} />
      )}
      <table className="table-fixed w-full text-center">
        <thead>
          <tr>
            <td>Image</td>
            <td>Name</td>
            <td>Category</td>
            <td>Rating</td>
            <td colSpan={2}>Action</td>
          </tr>
        </thead>
        <tbody>
          {movies.map(movie => {
            return (
              <tr key={movie.id}>
                <td className="flex justify-center items-center">
                  <img src={`/storage/${movie.thumbnail}`} alt="" className="rounded-md w-32" />
                </td>
                <td>
                  {movie.name}
                </td>
                <td>
                  {movie.category}
                </td>
                <td>
                  {movie.rating}
                </td>
                <td>
                  <Link href={route('admin.dashboard.movie.edit', movie.id)}>
                    <Button type="button" variant="warning">
                      Edit
                    </Button>
                  </Link>
                </td>
                <td>
                  <Button type="button" variant="danger" >
                    Delete
                  </Button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </Authenticated>
  )
}

export default Index;