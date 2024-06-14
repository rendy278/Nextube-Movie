"use client";
import { Movie } from "../../type";
import Image from "next/image";
import { getImagePath } from "@/lib/getImagePath";
import { useRouter } from "next/navigation";

const MovieCard = ({ movie }: { movie: Movie }) => {
  const router = useRouter();
  const hanldeRoute = () => {
    router.push(`/movie/${movie?.id}`);
  };
  return (
    <div
      onClick={hanldeRoute}
      className="relative transform hover:scale-105 transition duration-200 ease-out hover:drop-shadow-lg"
    >
      <div className="absolute w-full inset-0 bg-gradient-to-b from-gray-200/0 via-gray-900/10 to-gray-500 dark:to-[#1A1C29]/80 z-10" />
      <p className="absolute z-20 font-bold  bottom-5 left-5 text-white">
        {movie?.title}
      </p>
      <p className="absolute z-20  top-0 border border-red-600 bg-gray-600 font-bold right-0 p-2 text-white">
        {movie?.release_date}
      </p>
      <Image
        src={getImagePath(movie?.backdrop_path || movie?.poster_path)}
        alt={movie?.title}
        width={1920}
        height={1080}
        className="w-full  h-44 sm:h-56 object-cover shadow-md shadow-gray-600 drop-shadow-xl"
      />
    </div>
  );
};

export default MovieCard;
