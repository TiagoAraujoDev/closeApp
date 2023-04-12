'use client'

import { Movie, TvShow } from 'types'
import { useQuery } from 'react-query'
import { BsCardList } from 'react-icons/bs'

import { getAccountWatchlist } from '@/lib/axios/requests/interactions'

import { MovieCard } from '@/components/MovieCard'
import { TvShowCard } from '@/components/TvShowCard'
import { CardsSkeleton } from '@/components/Loading/CardsSkeleton'

interface WatchlistContainerProps {
  sessionId: string
  mediaType: string
}

export const WatchlistContainer = ({
  sessionId,
  mediaType,
}: WatchlistContainerProps) => {
  const {
    data: watchlist,
    isLoading,
    isSuccess,
  } = useQuery(`watchlist_${mediaType}`, async () => {
    const response = await getAccountWatchlist({ sessionId, mediaType })

    return response?.data.results
  })

  if (isLoading) {
    return <CardsSkeleton />
  }

  return (
    <>
      {isSuccess &&
        watchlist.length > 0 &&
        mediaType === 'movies' &&
        watchlist.map((movie: Movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      {isSuccess &&
        watchlist.length > 0 &&
        mediaType === 'tv' &&
        watchlist.map((tvshow: TvShow) => (
          <TvShowCard key={tvshow.id} tvshow={tvshow} />
        ))}
      {isSuccess && watchlist.length === 0 && (
        <div className="flex flex-col items-center justify-center min-h-full">
          <BsCardList size={64} className="text-neutral-400" />
          <h1 className="text-xl text-neutral-300">
            You haven&apos;t added any{' '}
            {mediaType === 'movies' ? 'movies' : 'Tv shows'} to your watchlist.
          </h1>
        </div>
      )}
    </>
  )
}
