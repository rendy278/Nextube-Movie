import MovieContainer from "@/components/MovieContainer";
import ButtonBack from "@/components/ui/buttonBack";
import { getDiscoverMovies } from "@/lib/getMovies";

interface Props {
  params: {
    id: string;
  };
  searchParams: {
    genre: string;
  };
}

const GenrePage = async ({
  params: { id },
  searchParams: { genre },
}: Props) => {
  const movies = await getDiscoverMovies(id);
  return (
    <div className="pt-[8.5rem] px-3 md:pt-[6rem] xl:pt-[8rem] max-w-screen-xl mx-auto">
      <h2 className="xl:text-4xl text-3xl font-bold px-10 mb-5 dark:text-white">
        Results for{" "}
        <span className="border-b-2 border-b-gray-600">{genre}</span>
      </h2>
      <MovieContainer movies={movies} title="Genre" isVertical />
      <div className="pb-4 px-10">
        <ButtonBack />
      </div>
    </div>
  );
};

export default GenrePage;
