'use client'

import { useContext } from 'react'
import { AiFillStar, AiFillHeart } from 'react-icons/ai'
import { IoMdBookmark } from 'react-icons/io'

import { AuthContext } from '@/context/AuthContext'

interface InteractableProps {
  voteAverage: number
  voteCount: number
  movieId: number
}

export function Interactable({
  voteAverage,
  voteCount,
  movieId,
}: InteractableProps) {
  const { sessionId } = useContext(AuthContext)

  console.log('sessionId', sessionId)
  console.log('movieId', movieId)
  return (
    <div className="flex items-center gap-2 sm:mb-2">
      <div className="flex items-center gap-1">
        <AiFillStar className="text-xs sm:text-base text-yellow-400 md:text-lg flex items-center justify-center" />
        <span className="text-xs sm:text-base md:text-lg flex items-center justify-center">
          {voteAverage.toFixed(2)}
        </span>
        <span className="text-lg">&middot;</span>
        <span className="text-xs sm:text-base md:text-lg flex items-center justify-center">
          {voteCount} votes
        </span>
      </div>
      <div className="flex items-center gap-2">
        <div className="bg-neutral-700 text-xs w-4 h-4 sm:text-base sm:w-6 sm:h-6 md:text-xl md:w-8 md:h-8 rounded-full flex items-center justify-center hover:scale-110 cursor-pointer">
          <IoMdBookmark className="text-xs sm:text-base text-emerald-500" />
        </div>
        <div className="bg-neutral-700 text-xs w-4 h-4 sm:text-base sm:w-6 sm:h-6 md:text-xl md:w-8 md:h-8 rounded-full flex items-center justify-center hover:scale-110  cursor-pointer">
          <AiFillHeart className="text-xs sm:text-base text-emerald-500" />
        </div>
        <div className="bg-neutral-700 text-xs w-4 h-4 sm:text-base sm:w-6 sm:h-6 md:text-xl md:w-8 md:h-8 rounded-full flex items-center justify-center hover:scale-110 cursor-pointer">
          <AiFillStar className="text-xs sm:text-base text-emerald-500" />
        </div>
      </div>
    </div>
  )
}
