import Image from "next/image";
import Link from "next/link";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillStar,
  AiFillTwitterSquare,
} from "react-icons/ai";
import { ImSpinner2 } from "react-icons/im";
import { MdRateReview } from "react-icons/md";
import { Actor, Crew, ExternalIds, MovieDetails, Review } from "types";

import { formatDate } from "@/utils/formatDate";
import {
  getMovieCredits,
  getMovieDetails,
  getMovieExternalIds,
  getMovieReviews,
} from "@/lib/axios/requests/movies";
import { treatAvatarPath } from "@/utils/treatReviewAuthorAvatarPath";
import { convertCodeToLang } from "@/utils/convertCodeToLang";
import { formatCurrency } from "@/utils/formatCurrency";

import { Interactable } from "@/components/MovieDetails/Interactable";

import placeholderBackdrop from "../../../../public/placeholderBackdrop.png";
import placeholderPoster from "../../../../public/placeholderPoster.png";

interface MovieDetailsProps {
  params: {
    id: number;
  };
}

export default async function MovieDetailsPage({ params }: MovieDetailsProps) {
  const [
    movieDetailsResponse,
    movieCreditsResponse,
    movieExternalIdsResponse,
    movieReviewsResponse,
  ] = await Promise.all([
    getMovieDetails(params.id),
    getMovieCredits(params.id),
    getMovieExternalIds(params.id),
    getMovieReviews(params.id),
  ]);

  const movieDetails: MovieDetails = movieDetailsResponse?.data;
  const externalIds: ExternalIds = movieExternalIdsResponse?.data;
  const movieReviews: Review[] = movieReviewsResponse?.data.results;
  const cast: Actor[] = movieCreditsResponse?.data.cast;
  const crew: Crew[] = movieCreditsResponse?.data.crew;

  if (crew) crew.length = 5;
  if (cast) cast.length = 10;

  if (!movieDetails || !movieReviews || !externalIds || !cast || !crew) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <ImSpinner2 className="animate-spin text-neutral-100 text-xl" />
      </div>
    );
  }

  return (
    <main className="text-neutral-100 max-w-screen-xl min-h-full mx-auto">
      {/** Banner */}
      <section className="min-w-full relative mb-4">
        {/** Background */}
        {movieDetails.backdrop_path ? (
          <Image
            src={`https://www.themoviedb.org/t/p/w1280${movieDetails.backdrop_path}`}
            alt=""
            width={1280}
            height={720}
            className="object-contain opacity-50"
          />
        ) : (
          <Image src={placeholderBackdrop} alt="" width={1280} height={720} />
        )}
        <div className="w-full h-full bg-transparent absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 py-8 px-4 sm:py-10 sm:px-5 md:py-16 md:px-6">
          {/** Container flex */}
          <div className="w-full h-full bg-transparent flex items-center gap-4">
            {movieDetails.poster_path ? (
              <div className="flex w-[100px] sm:w-[150px] md:w-[210px] lg:w-[295px]">
                <Image
                  src={`https://www.themoviedb.org/t/p/w780${movieDetails.poster_path}`}
                  alt=""
                  width={780}
                  height={1170}
                  className="object-contain flex-1 shadow-neutral-300/30 border border-neutral-300/50 shadow-xl rounded overflow-hidden"
                />
              </div>
            ) : (
              <div className="flex w-[100px] sm:w-[150px] md:w-[210px] lg:w-[295px]">
                <Image
                  src={placeholderPoster}
                  alt=""
                  width={780}
                  height={1170}
                  className="object-contain flex-1 shadow-neutral-300/30 border border-neutral-300/50 shadow-xl rounded overflow-hidden"
                />
              </div>
            )}
            {/** Infos */}
            <div className="flex-1">
              {/** Header */}
              <div className="flex items-center gap-1">
                <h1 className="text-neutral-100 text-sm sm:text-lg md:text-2xl lg:text-3xl font-medium">
                  {movieDetails.original_title}
                </h1>
                <span className="text-neutral-400 text-base sm:text-lg md:text-2xl hidden sm:block">
                  ({movieDetails.release_date.slice(0, 4)})
                </span>
              </div>
              {/** Infos */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-1 sm:mb-1">
                <span className="text-neutral-300 text-xs sm:text-base">
                  {movieDetails.release_date}
                </span>
                <span className="text-lg hidden sm:block">&middot;</span>
                <span className="text-neutral-300 text-xs sm:text-base flex gap-1 items-center">
                  {movieDetails.genres.map((genre, index) => (
                    <span className="underline" key={index}>
                      {genre.name}
                    </span>
                  ))}
                </span>
                <span className="hidden text-lg sm:block">&middot;</span>
                <span className="hidden sm:inline-block text-neutral-300 text-xs sm:text-base">
                  {movieDetails.runtime} min
                </span>
              </div>
              {/** Intaractive: ClientComponent */}
              <Interactable
                voteAverage={movieDetails.vote_average}
                voteCount={movieDetails.vote_count}
              />
              {/** Tagline */}
              <p className="hidden sm:block text-neutral-400 text-base lg:text-lg italic mb-2">
                {movieDetails.tagline}
              </p>
              {/** Sinopse */}
              <div className="flex flex-col w-56 sm:w-full sm:mb-2">
                <h2 className="text-xs sm:text-base lg:text-2xl text-neutral-200 font-medium">
                  Sinopse
                </h2>
                {movieDetails.overview && (
                  <p
                    title={movieDetails.overview}
                    className="text-xs sm:text-sm lg:text-lg text-neutral-200 whitespace-nowrap sm:whitespace-normal text-ellipsis overflow-hidden"
                  >
                    {movieDetails.overview}
                  </p>
                )}
              </div>
              {/** Crew */}
              <div className="hidden md:grid grid-cols-3">
                {crew.map((item, index) => {
                  return (
                    <div key={index} className="flex flex-col items-start">
                      <span className="text-sm text-neutral-100 sm:text-base">
                        {item.original_name}
                      </span>
                      <span className="text-sm text-neutral-400 font-medium sm:text-base">
                        {item.job}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Cast carousel */}
      <section className="px-6 mb-6">
        <h2 className="text-lg md:text-2xl text-neutral-100 font-semibold mb-1">
          Cast
        </h2>
        <div className="flex justify-start gap-2 w-full pb-3 overflow-auto scrollbar-thin scrollbar-thumb-emerald-500 scrollbar-track-neutral-300">
          {cast &&
            cast.map((actor) => {
              return (
                <div
                  key={actor.id}
                  className="min-w-[75px] sm:min-w-[125px] flex flex-col border rounded border-transparent overflow-hidden"
                >
                  {actor.profile_path ? (
                    <Image
                      src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                      alt=""
                      width={185}
                      height={278}
                      className="object-contain"
                    />
                  ) : (
                    <Image
                      src={placeholderPoster}
                      alt=""
                      width={185}
                      height={278}
                      className="object-contain flex-1"
                    />
                  )}
                  <div className="min-h-fit py-2 px-1 flex flex-col bg-neutral-400">
                    <span
                      title={actor.original_name}
                      className="text-xs sm:text-base whitespace-nowrap text-ellipsis overflow-hidden text-neutral-200"
                    >
                      {actor.original_name}
                    </span>
                    <span
                      title={actor.character}
                      className="text-xs sm:text-base whitespace-nowrap text-ellipsis overflow-hidden text-neutral-700 font-semibold"
                    >
                      {actor.character}
                    </span>
                  </div>
                </div>
              );
            })}
        </div>
      </section>
      {/* Informations */}
      <section className="px-6 mb-6">
        <h2 className="text-lg md:text-2xl text-neutral-100 font-semibold mb-1">
          Informations
        </h2>
        <div className="grid grid-cols-2">
          <div>
            <h3 className="text-sm md:text-lg text-neutral-100 font-medium">
              Status
            </h3>
            <span className="text-xs md:text-base text-neutral-300">
              {movieDetails.status}
            </span>
          </div>
          <div>
            <h3 className="text-sm md:text-lg text-neutral-100 font-medium">
              Original Language
            </h3>
            <span className="text-xs md:text-base text-neutral-300">
              {convertCodeToLang(movieDetails.original_language)}
            </span>
          </div>
          <div>
            <h3 className="text-sm md:text-lg text-neutral-100 font-medium">
              Budget
            </h3>
            <span className="text-xs md:text-base text-neutral-300">
              {movieDetails.budget !== 0
                ? `${formatCurrency(movieDetails.budget)}`
                : "-"}
            </span>
          </div>
          <div>
            <h3 className="text-sm md:text-lg text-neutral-100 font-medium">
              Revenue
            </h3>
            <span className="text-xs md:text-base text-neutral-300">
              {movieDetails.revenue !== 0
                ? `${formatCurrency(movieDetails.revenue)}`
                : "-"}
            </span>
          </div>
        </div>
      </section>
      {/* External links */}
      <section className="px-6 mb-8">
        <h2 className="text-lg md:text-2xl text-neutral-100 font-semibold mb-1">
          External Links
        </h2>
        <div className="flex items-center">
          {externalIds.facebook_id ? (
            <Link
              target={"_blank"}
              href={`https://www.facebook.com/${externalIds.facebook_id}`}
            >
              <AiFillFacebook size={24} className="cursor-pointer" />
            </Link>
          ) : (
            <AiFillFacebook size={24} className="cursor-not-allowed" />
          )}
          {externalIds.instagram_id ? (
            <Link
              target={"_blank"}
              href={`https://www.instagram.com/${externalIds.instagram_id}`}
            >
              <AiFillInstagram size={24} className="cursor-pointer" />
            </Link>
          ) : (
            <AiFillInstagram size={24} className="cursor-not-allowed" />
          )}
          {externalIds.twitter_id ? (
            <Link
              target={"_blank"}
              href={`https://www.twitter.com/${externalIds.twitter_id}`}
            >
              <AiFillTwitterSquare size={24} className="cursor-pointer" />
            </Link>
          ) : (
            <AiFillTwitterSquare size={24} className="cursor-not-allowed" />
          )}
        </div>
      </section>
      {/* Separator  */}
      <section className="mb-6 px-6">
        <div className="h-2 border-t border-emerald-500 rounded-t mx-auto"></div>
      </section>
      {/* Reviews */}
      <section className="px-6 mb-6">
        <h2 className="text-center text-lg md:text-2xl text-neutral-100 font-semibold mb-4">
          Reviews
          <span className="text-sm sm:text-base md:text-lg text-neutral-300 ml-1">
            ({movieReviews.length})
          </span>
        </h2>
        <div>
          {movieReviews.length > 0 ? (
            movieReviews.map((review) => (
              <div
                key={review.id}
                className="mb-3 last:mb-0 bg-neutral-600 shadow shadow-neutral-700 rounded py-4 px-3 space-y-2"
              >
                {/** Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Image
                      src={`http://www.gravatar.com/avatar${treatAvatarPath(
                        review.author_details.avatar_path,
                      )}`}
                      width={80}
                      height={80}
                      alt=""
                      className="w-7 h-7 rounded-full"
                    />
                    <span className="text-sm text-neutral-200 font-semibold">
                      {review.author}
                    </span>
                  </div>
                  <div className="bg-neutral-700 shadow-neutral-800 shadow-md py-0 px-1 flex items-center gap-1 rounded">
                    <AiFillStar color="yellow" />
                    <span className="text-neutral-300">
                      {review.author_details.rating
                        ? review.author_details.rating
                        : "-"}
                    </span>
                  </div>
                </div>
                {/** Content */}
                <p className="text-neutral-200 text-base overflow-hidden">
                  {review.content}
                </p>
                <div className="text-sm text-right italic text-neutral-400">
                  {formatDate(review.created_at.slice(0, 10))}
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center space-y-4">
              <MdRateReview className="text-neutral-500 text-5xl" />
              <p className="text-base text-neutral-300 font-bold">
                There isn&apos;t no review yet!
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
