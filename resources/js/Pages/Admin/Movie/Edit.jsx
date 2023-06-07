import Authenticated from "@/Layouts/Authenticated/Index";
import { Head, useForm } from "@inertiajs/inertia-react";
import ValidationErrors from "@/Components/ValidationErrors";
import Label from "@/Components/Label";
import Input from "@/Components/Input";
import Checkbox from "@/Components/Checkbox";
import Button from "@/Components/Button";

const Create = ({ auth, movie }) => {
  const { data, setData, put, processing, errors } = useForm({
    ...movie
  });

  const onHandleChange = (event) => {
    setData(event.target.name,
      event.target.type === 'file'
        ? event.target.files[0]
        : event.target.value);
  };

  const submit = (e) => {
    e.preventDefault();
    if (data.thumbnail === movie.thumbnail) {
      delete data.thumbnail;
    }
    put(route('admin.dashboard.movie.update', movie.id), {
      ...data
    });
  };
  return (
    <Authenticated auth={auth}>
      <Head title="Admin - Create Movie" />
      <h1 className="text-xl mb-4">Update Movie : {movie.name}</h1>
      <ValidationErrors errors={errors} />
      <form onSubmit={submit} className="w-1/2">
        <Label
          forInput="name"
          value="Name"
        />
        <Input
          type="text"
          name="name"
          defaultValue={movie.name}
          variant="primary-outline"
          handleChange={onHandleChange}
          placeholder="Enter the name of the movie"
          isError={errors.name}
        />
        <Label
          forInput="category"
          value="Category"
          className={`mt-4`}
        />
        <Input
          type="text"
          name="category"
          defaultValue={movie.category}
          variant="primary-outline"
          handleChange={onHandleChange}
          placeholder="Enter the category of the movie"
          isError={errors.category}
        />
        <Label
          forInput="video_url"
          value="Video URL"
          className={`mt-4`}
        />
        <Input
          type="text"
          name="video_url"
          defaultValue={movie.video_url}
          variant="primary-outline"
          handleChange={onHandleChange}
          placeholder="Enter the video URL of the movie"
          isError={errors.video_url}
        />
        <Label
          forInput="thumbail"
          value="Thumbnail"
          className={`mt-4`}
        />
        <img src={`/storage/${movie.thumbnail}`} alt="" className="w-40" />
        <Input
          type="file"
          name="thumbnail"
          variant="primary-outline"
          handleChange={onHandleChange}
          placeholder="Insert Thumbnail of the movie"
          isError={errors.thumbnail}
        />
        <Label
          forInput="rating"
          value="Rating"
          className={`mt-4`}
        />
        <Input
          type="number"
          name="rating"
          defaultValue={movie.rating}
          variant="primary-outline"
          handleChange={onHandleChange}
          placeholder="Enter the rating of the movie"
          isError={errors.rating}
        />
        <div className="flex fle-row mt-4 item-center">
          <Label
            forInput="is Featured"
            value="Is Featured"
            className={`mr-3`}
          />
          <Checkbox
            name="is_featured"
            handleChange={(e) => setData('is_featured', e.target.checked)}
            checked={movie.is_featured}
          />
        </div>
        <Button type="submit" className="mt-4" processing={processing}>
          Save
        </Button>
      </form>
    </Authenticated>
  )
};

export default Create;