import MovieContainer from "@/components/MovieContainer";
import ButtonBack from "@/components/ui/buttonBack";
import VideoPlayer from "@/components/VideoPlayer";
import { getImagePath } from "@/lib/getImagePath";
import {
  getMovieDetails,
  getMovieVideos,
  getPopularMovies,
} from "@/lib/getMovies";
import { Metadata } from "next";
import Image from "next/image";
import React from "react";

export const metadata: Metadata = {
  title: "Movie Studio Clone || Movie Details page",
};

interface Props {
  params: {
    id: string;
  };
}

const MovieDetails = async ({ params: { id } }: Props) => {
  const movies = await getMovieVideos(id);
  const videos = movies.map((movie: any) => ({
    id: movie.id,
    iso_639_1: movie.iso_639_1,
    iso_3166_1: movie.iso_3166_1,
    key: movie.key,
    name: movie.name,
    official: movie.official,
    published_at: movie.published_at,
    site: movie.site,
    size: movie.size,
    type: movie.type,
  }));
  const details: any = await getMovieDetails(id);
  const popoularMovies = await getPopularMovies();

  return (
    <div className="pt-[6.8rem] md:pt-[4.3rem] xl:pt-[4.6rem]">
      <div className="px-6">
        <div className="py-10 flex flex-col lg:flex-row items-center gap-5">
          <div className="w-full lg:w-1/2 h-full rounded-md overflow-hidden group">
            <Image
              src={getImagePath(details?.backdrop_path)}
              alt={details?.title}
              width={1920}
              height={1080}
              className="w-full h-full object-cover shadow-md shadow-gray-900 drop-shadow-xl group-hover:scale-110 duration-500"
            />
          </div>
          <div className="w-full lg:w-1/2 flex flex-col gap-2">
            <h2 className="text-2xl dark:text-white text-black  font-semibold underline decoration-[1px]">
              {details?.original_title}
            </h2>
            <p className="text-sm leading-6 dark:text-white text-black tracking-wide mt-2">
              {details?.overview}
            </p>
            <p className="dark:text-gray-200 text-gray-800 text-sm">
              Rating:{" "}
              <span className="dark:text-white text-gray-800  font-medium">
                {details.vote_average}
              </span>
            </p>
            <p className="dark:text-gray-200 text-gray-800  text-sm">
              Votes:{" "}
              <span className="dark:text-white text-gray-800  font-medium">
                {details.vote_count}
              </span>
            </p>
            <p className="dark:text-gray-200 text-gray-800  text-sm">
              Release Data:{" "}
              <span className="dark:text-white text-gray-800  font-medium">
                {details.release_date}
              </span>
            </p>
            <p className="dark:text-gray-200 text-gray-800  text-sm">
              Genres:{" "}
              {details?.genres.map((item: any) => (
                <span
                  key={item?.id}
                  className="dark:text-white text-gray-800   font-medium mr-1"
                >
                  {item?.name},
                </span>
              ))}
            </p>
            <p className="dark:text-gray-200 text-gray-800  text-sm">
              Tag Line:{" "}
              <span className="dark:text-white text-gray-800  font-medium">
                {details.tagline}
              </span>
            </p>
            <p className="dark:text-gray-200 text-gray-800  text-sm">
              Status:{" "}
              <span
                className={`font-medium ${
                  details?.status === "Released"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {details.status}
              </span>
            </p>
          </div>
        </div>
        <VideoPlayer videos={videos} />
        <ButtonBack />
      </div>
      <div className="mt-6">
        <MovieContainer
          movies={popoularMovies}
          title="Popular Movies"
          isVertical
        />
      </div>
    </div>
  );
};

export default MovieDetails;
