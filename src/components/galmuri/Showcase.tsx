import {sanityClient} from 'sanity:client'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import {Skeleton} from '@/components/ui/skeleton'
import {loadQuery} from '@/lib/sanity'
import type {SanityDocument} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import {WheelGesturesPlugin} from 'embla-carousel-wheel-gestures'
import type {Game} from 'sanity.types'

const {data: galmuri} = await loadQuery<SanityDocument[]>({
  query: `*[_type == "galmuri"]`,
})

const builder = imageUrlBuilder(sanityClient)

const linkPrefix = {
  steam: 'https://store.steampowered.com/app/',
  appstore: 'https://apps.apple.com/app/',
  patch: 'https://',
}

export function Showcase() {
  return (
    <Carousel
      className="mt-[.5em]"
      opts={{align: 'start', loop: true}}
      plugins={[WheelGesturesPlugin()]}
    >
      <CarouselContent className="-ml-[1em]">
        {galmuri[0].showcase.reverse().map((game: Game) => {
          if (game.screenshot?.asset && game.type) {
            const size = game.screenshot.asset._ref.split('-')[2]
            const aspectRatio = Number(size.split('x')[0]) / Number(size.split('x')[1])
            const image = builder
              .image(game.screenshot.asset._ref)
              .height(640)
              .fit('max')
              .auto('format')

            return (
              <CarouselItem key={game.title} className="basis-auto pl-[1em]">
                <figure>
                  <Skeleton
                    style={{aspectRatio: aspectRatio}}
                    className="absolute -z-10 rounded-none h-40 sm:h-52 md:h-60 lg:h-72 xl:h-80"
                  />
                  <img style={{aspectRatio: aspectRatio}} src={image.url()} alt={game.title} />
                  <span className="overlay" />
                  <figcaption>
                    <a
                      href={linkPrefix[game.type] + game.url}
                      target="_blank"
                      rel="nofollow noreferrer noopener"
                    >
                      {game.title}
                    </a>{' '}
                    {game.type === 'patch' ? 'by' : '©'} {game.author}
                    {game.type === 'patch' && ' (사용자 패치)'}
                  </figcaption>
                </figure>
              </CarouselItem>
            )
          }
        })}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
