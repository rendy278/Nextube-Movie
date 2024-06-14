import MovieContainer from "@/components/MovieContainer";
import { getPopularMovies, getSearchedMovies } from "@/lib/getMovies";
import ButtonBack from "@/components/ui/buttonBack";
import Link from "next/link";
interface Props {
  params: {
    term: string;
  };
}

const SearchPage = async ({ params: { term } }: Props) => {
  const termToUse = decodeURI(term);

  const movies = await getSearchedMovies(termToUse);
  const popularMovies = await getPopularMovies();

  return (
    <div className="pt-[8.5rem]  md:pt-[6rem] xl:pt-[8rem] max-w-screen-xl mx-auto">
      <h2 className="text-4xl font-bold px-10 mb-5 dark:text-white">
        Results for{" "}
        <span className="border-b-2 border-b-gray-600">{termToUse}</span>
      </h2>
      {movies.length > 0 ? (
        <MovieContainer movies={movies} title="Searched Movies" isVertical />
      ) : (
        <div className="px-4 mb-5 dark:text-white flex flex-wrap gap-2 text-3xl">
          <h1>Items Not Found, Please Search Items Again or Back To</h1>
          <Link href="/" className="text-red-500">
            Home Page
          </Link>
        </div>
      )}
      <MovieContainer movies={popularMovies} title="You may also like" />
      <div className="pb-4 px-10">
        <ButtonBack />
      </div>
    </div>
  );
};

export default SearchPage;
