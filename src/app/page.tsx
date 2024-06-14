import CaraouselBanner from "@/components/CaraouselBanner";
import Footer from "@/components/Footer";
import MovieContainer from "@/components/MovieContainer";
import {
  getNowPlayingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from "@/lib/getMovies";

export default async function Home() {
  const nowPlayingMovies = await getNowPlayingMovies();
  const upComingMovies = await getUpcomingMovies();
  const topRatedMovies = await getTopRatedMovies();
  const popularMovies = await getPopularMovies();

  return (
    <main>
      <CaraouselBanner />
      <div className="flex flex-col space-y-2">
        <MovieContainer movies={nowPlayingMovies} title="Now Playing" />
        <MovieContainer movies={upComingMovies} title="Upcoming Movies" />
        <MovieContainer movies={topRatedMovies} title="Top Rated Movies" />
        <MovieContainer movies={popularMovies} title="Popular Movies" />
      </div>
    </main>
  );
}
