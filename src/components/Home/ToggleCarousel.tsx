import * as ToogleGroup from '@radix-ui/react-toggle-group'

import { formatLabel } from '@/utils/formatLabel'

interface ToggleCarouselProps {
  onToggleChange: (label: string) => void
  labels: string[]
  currentLabel: string
}

export const ToggleCarousel = ({
  labels,
  currentLabel,
  onToggleChange,
}: ToggleCarouselProps) => {
  return (
    <ToogleGroup.Root
      className="flex items-center w-fit"
      type="single"
      defaultValue={currentLabel}
      onValueChange={(value) => {
        if (value) onToggleChange(value)
      }}
    >
      {labels.map((label, index) => {
        return (
          <ToogleGroup.Item
            className="text-sm sm:text-base lg:text-xl bg-neutral-200 text-neutral-800 border border-neutral-800 first:rounded-tl first:rounded-bl last:rounded-br last:rounded-tr py-1 px-3 overflow-hidden radix-state-on:bg-emerald-500 radix-state-on:text-neutral-50"
            key={index}
            value={label}
          >
            {formatLabel(label)}
          </ToogleGroup.Item>
        )
      })}
    </ToogleGroup.Root>
  )
}
