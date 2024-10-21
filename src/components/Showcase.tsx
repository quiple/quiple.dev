import type { Image } from 'astro:assets'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'

interface game {
  title: string
  author: string
  link: string
  type: 'steam' | 'appstore' | 'patch'
  image: typeof Image
}

export function Showcase(items: game[]) {
  return (
    <Carousel
      opts={{
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 3000,
        }),
      ]}
    >
      <CarouselContent>
        {items.map((game) => {
          return <CarouselItem key={game.title}>{game.title}</CarouselItem>
        })}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
