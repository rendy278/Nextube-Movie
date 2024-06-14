"use client";
import React, { useEffect, useState, useCallback } from "react";
import { Videos } from "../../type";
import YouTube, { YouTubeProps } from "react-youtube";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowRight, ArrowLeft } from "lucide-react";

const VideoPlayer = ({ videos }: Videos) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
  });
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const onPlayerReady: YouTubeProps["onReady"] = (event: any) => {
    event.target.pauseVideo();
  };

  const opts = {
    height: "300px",
    width: "100%",
  };

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
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-5 dark:text-white">
        Official videos from YouTube:
      </h2>
      <div className="relative">
        <div ref={emblaRef} className="embla overflow-hidden">
          <div className="embla__container flex">
            {videos.map((video) => (
              <div
                key={video?.id}
                className="embla__slide  flex-none w-full md:w-1/2 lg:w-1/3 p-2"
              >
                <div className="border border-gray-600 rounded-md w-full overflow-hidden relative">
                  <p className="text-sm dark:text-white font-medium px-6 py-3">
                    Type: {video?.type} -{" "}
                    {video?.official ? "Official" : "General"}
                  </p>
                  <YouTube
                    videoId={video?.key}
                    onReady={onPlayerReady}
                    opts={opts}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <button
          className="embla__prev opacity-80 absolute left-2 cursor-pointer top-[50%] transform -translate-y-1/2 border border-red-600 bg-gray-700 text-white p-2 rounded-full"
          onClick={scrollPrev}
          disabled={prevBtnDisabled}
        >
          <ArrowLeft />
        </button>
        <button
          className="embla__next opacity-80 absolute right-2 cursor-pointer top-[50%] transform -translate-y-1/2 border border-red-600 bg-gray-700 text-white p-2 rounded-full"
          onClick={scrollNext}
          disabled={nextBtnDisabled}
        >
          <ArrowRight />
        </button>
      </div>
    </div>
  );
};

export default VideoPlayer;
