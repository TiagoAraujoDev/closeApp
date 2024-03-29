"use client";

import { memo, useCallback, useState } from "react";
import { useQuery } from "react-query";

import { getTrending } from "@/lib/axios/requests/trending";

import Carousel from "@/components/Home/Carousel";
import CarouselSkeleton from "@/components/Loading/CarouselSkeleton";
import ToggleCarousel from "@/components/Home/ToggleCarousel";

interface TrendingProps {
  variant: string
  periods: string[]
}

function TrendingSection({ variant, periods }: TrendingProps) {
  const [period, setPeriod] = useState(periods[0]);

  const sectionTitle = variant === "movie" ? "Trending movies" : "Trending TV";

  const queryKey = `${variant}_${period}`;

  const { data, isLoading } = useQuery(
    queryKey,
    async () => {
      const response = await getTrending(variant, period);
      return response?.data.results;
    },
    {
      refetchOnMount: false,
      staleTime: 60 * 60 * 2, // 2 hours
    },
  );

  const handleToggleChange = useCallback((period: string) => {
    setPeriod(period);
  }, []);

  if (isLoading) {
    return (
      <CarouselSkeleton labels={periods} label={period} title={sectionTitle} />
    );
  }

  return (
    <section className="mb-10 flex w-full flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-xl font-bold text-neutral-100 md:text-2xl">
          {sectionTitle}
        </span>
        <ToggleCarousel
          labels={periods}
          currentLabel={period}
          onToggleChange={handleToggleChange}
        />
      </div>
      {variant === "movie" ? (
        <Carousel movies={data} />
      ) : (
        <Carousel tvshows={data} />
      )}
    </section>
  );
}

export default memo(TrendingSection);
