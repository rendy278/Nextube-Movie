"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { Movie } from "../../type";
import MovieCard from "./MovieCard";
import { cn } from "@/lib/utils";

type Props = {
  title?: string;
  movies: Movie[];
  isVertical?: boolean;
};

const MovieContainer = ({ title, movies, isVertical }: Props) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
  });
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
  const [pages, setPages] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(3);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
    setCurrentPage(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
    setPages(
      Array.from({ length: emblaApi.scrollSnapList().length }, (_, i) => i)
    );
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (emblaApi) {
      emblaApi.reInit();
    }
  }, [emblaApi, movies]);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setItemsPerSlide(1);
      } else if (width < 768) {
        setItemsPerSlide(1);
      } else if (width < 1024) {
        setItemsPerSlide(2);
      } else {
        setItemsPerSlide(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getSlides = () => {
    const slides = [];
    if (movies) {
      for (let i = 0; i < movies.length; i += itemsPerSlide) {
        slides.push(movies.slice(i, i + itemsPerSlide));
      }
    } else {
      console.log(`API pada ${movies} tersebut tidak dapat terhubung`);
    }
    return slides;
  };

  const slides = getSlides();

  return (
    <div>
      <div className="mx-10 p-1 mt-2 sm:p-3 flex items-center justify-between border-b border-b-gray-500 relative mb-4">
        <h2 className="text-xs sm:text-sm xl:text-lg uppercase dark:text-white font-bold tracking-wider">
          {title}
        </h2>

        <span className="w-16 h-1 bg-red-600 inline-block absolute left-0 -bottom-[1.5px] z-10" />
      </div>
      <div className="relative">
        <div ref={emblaRef} className="embla overflow-hidden">
          <div
            className={cn(
              "embla__container flex",
              isVertical && "flex-col xl:p-9 md:p-3 p-2"
            )}
          >
            {isVertical
              ? movies?.map((movie) => (
                  <div
                    key={movie.id}
                    className="flex flex-col space-y-5 mb-5 items-center lg:flex-row space-x-5"
                  >
                    <MovieCard movie={movie} />
                    <div className="max-w-2xl dark:text-white">
                      <p className="font-bold">
                        {movie?.title} ({movie?.release_date?.split("-")[0]})
                      </p>
                      <p>Popularity: {movie?.popularity}</p>
                      <hr className="mb-3" />
                      <p>{movie?.overview}</p>
                    </div>
                  </div>
                ))
              : slides.map((slide, index) => (
                  <div key={index} className="embla__slide flex-none w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 p-5">
                      {slide.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                      ))}
                    </div>
                  </div>
                ))}
          </div>
        </div>
        {!isVertical && (
          <>
            <button
              className="embla__prev absolute left-2 cursor-pointer top-[35%] border border-red-600 bg-gray-700 text-white p-2 rounded-full"
              onClick={scrollPrev}
              disabled={prevBtnDisabled}
            >
              <ArrowLeft />
            </button>
            <button
              className="embla__next absolute right-2 cursor-pointer top-[35%] border border-red-600 bg-gray-700 text-white p-2 rounded-full"
              onClick={scrollNext}
              disabled={nextBtnDisabled}
            >
              <ArrowRight />
            </button>
            <div className="embla__pagination p-4 flex justify-center space-x-2 mt-4">
              {pages.map((page) => (
                <button
                  key={page}
                  className={cn(
                    "embla__pagination__dot",
                    page === currentPage ? "bg-red-600" : "bg-gray-500",
                    "w-2 h-2 rounded-full"
                  )}
                  onClick={() => emblaApi?.scrollTo(page)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MovieContainer;
