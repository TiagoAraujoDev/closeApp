import { PopularMoviesContainer } from "@/components/Movies/PopularContainer";

export default function MoviesPopularPage() {
  return (
    <section className="min-h-screen max-w-5xl px-16 mx-auto">
      <h1 className="text-neutral-100 text-xl md:text-2xl font-bold text-center my-6">
        Popular movies
      </h1>
      <PopularMoviesContainer />
    </section>
  );
}
