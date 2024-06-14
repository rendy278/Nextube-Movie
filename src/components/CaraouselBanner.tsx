import { getDiscoverMovies } from "@/lib/getMovies";
import React from "react";
import HeroCaraousel from "./HeroCaraousel";

interface Props {
  id?: string;
  keywords?: string;
}

const CaraouselBanner = async ({ id, keywords }: Props) => {
  const movies = await getDiscoverMovies();
  return <HeroCaraousel movies={movies} />;
};

export default CaraouselBanner;
