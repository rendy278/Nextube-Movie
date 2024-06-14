"use client";
import React from "react";
import { Movie } from "../../type";
import useEmblaCarousel from "embla-carousel-react";
import AutoPlay from "embla-carousel-autoplay";
import Image from "next/image";
import { getImagePath } from "@/lib/getImagePath";

interface Props {
  movies: Movie[];
}

const HeroCaraousel = ({ movies }: Props) => {
  const [emblaRef] = useEmblaCarousel({ loop: false }, [AutoPlay()]);
  return (
    <section
      className="overflow-hidden pt-[6.8rem] md:pt-[4.3rem] xl:pt-[4.6rem] relative "
      ref={emblaRef}
    >
      <div className="flex">
        {movies.map((movie) => (
          <div key={movie?.id} className="flex-full  min-w-0 relative">
            <Image
              src={getImagePath(movie?.backdrop_path, true)}
              alt={movie?.title}
              width={1250}
              height={600}
              className="w-full h-full object-cover"
            />
            <div className=" lg:inline hidden sm:inline absolute top-0 pt-[2rem] md:pt-36 xl:pt-52 left-0 bg-transparent z-20 h-full  w-full bg-gradient-to-r from-gray-900/90 via-transparent to-transparent p-10 space-y-4 text-white">
              <h2 className="xl:text-5xl text-xl md:text-3xl font-bold max-w-xl">
                {movie?.title}
              </h2>
              <p className="max-w-xl xl:text-4xl text-sm md:text-2xl line-clamp-3">
                {movie?.overview}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute top-0 left-0 inset-0 bg-gradient-to-b from-gray-900/10 via-gray-900/30 to-gray-600 dark:to-[#121212]" />
    </section>
  );
};

export default HeroCaraousel;
