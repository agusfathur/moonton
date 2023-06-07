import Button from "@/Components/Button";
import FlashMessage from "@/Components/FlashMessage";
import Authenticated from "@/Layouts/Authenticated/Index";
import { Link } from "@inertiajs/inertia-react";

const Index = ({ auth, flashMessage }) => {
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
    </Authenticated>
  )
}

export default Index;