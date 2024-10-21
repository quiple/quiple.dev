import sc200223 from '@/assets/showcase/200223.png'
import sc200622 from '@/assets/showcase/200622.png'
import sc201221 from '@/assets/showcase/201221.png'
import sc210105 from '@/assets/showcase/210105.png'
import sc210223 from '@/assets/showcase/210223.jpg'
import sc210302 from '@/assets/showcase/210302.jpg'
import sc220220 from '@/assets/showcase/220220.png'
import sc220507 from '@/assets/showcase/220507.png'
import sc220621 from '@/assets/showcase/220621.jpg'
import sc221006 from '@/assets/showcase/221006.webp'
import sc221127 from '@/assets/showcase/221127.png'
import sc230420 from '@/assets/showcase/230420.png'
import sc240111_2 from '@/assets/showcase/240111-2.png'
import sc240111 from '@/assets/showcase/240111.png'
import sc240118 from '@/assets/showcase/240118.jpg'
import sc240202 from '@/assets/showcase/240202.png'
import sc240218 from '@/assets/showcase/240218.png'
import sc240710 from '@/assets/showcase/240710.jpg'
import sc240905 from '@/assets/showcase/240905.jpg'
import sc240919 from '@/assets/showcase/240919.png'
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
  image: ImageMetadata
}

const games: game[] = [
  {
    title: 'Keylocker',
    author: 'Moonana',
    link: '1325040',
    type: 'steam',
    image: sc240919,
  },
  {
    title: '소년기의 끝',
    author: 'buriki clock',
    link: '2403290',
    type: 'steam',
    image: sc240905,
  },
  {
    title: 'Time Treker',
    author: 'Fuse Game',
    link: '2776500',
    type: 'steam',
    image: sc240710,
  },
  {
    title: 'ZeroRanger',
    author: 'Robeureu',
    link: 'blog.naver.com/robeureu/223357336308',
    type: 'patch',
    image: sc240218,
  },
  {
    title: 'STONKS-9800',
    author: 'TERNOX',
    link: '1539140',
    type: 'steam',
    image: sc240202,
  },
  {
    title: '미제사건은 끝내야 하니까',
    author: 'Somi',
    link: '2676840',
    type: 'steam',
    image: sc240118,
  },
  {
    title: 'VVVVVV',
    author: 'Terry Cavanagh',
    link: '70300',
    type: 'steam',
    image: sc240111_2,
  },
  {
    title: 'Momodora: Moonlit Farewell',
    author: 'Bombservice',
    link: '1747760',
    type: 'steam',
    image: sc240111,
  },
  {
    title: 'Coffee Talk Episode 2: Hibiscus & Butterfly',
    author: 'Toge Productions',
    link: '1663220',
    type: 'steam',
    image: sc230420,
  },
  {
    title: 'Papers, Please',
    author: 'Lucas Pope',
    link: '239030',
    type: 'steam',
    image: sc221127,
  },
  {
    title: 'Dungeon Squad',
    author: 'GameCoaster',
    link: '1642733080',
    type: 'appstore',
    image: sc221006,
  },
  {
    title: 'Shotgun King: The Final Checkmate',
    author: 'PUNKCAKE Delicieux',
    link: '1972440',
    type: 'steam',
    image: sc220621,
  },
  {
    title: 'Monster Sanctuary',
    author: '솔라리어스',
    link: 'blog.naver.com/ansewo/222702695752',
    type: 'patch',
    image: sc220507,
  },
  {
    title: 'NEEDY GIRL OVERDOSE',
    author: '코스믹딜루즈 & quiple',
    link: 'cosmicdeluge.tistory.com/5',
    type: 'patch',
    image: sc220220,
  },
  {
    title: 'Teamfight Manager',
    author: 'Team Samoyed',
    link: '1372810',
    type: 'steam',
    image: sc210302,
  },
  {
    title: 'BLUE REVOLVER',
    author: 'Sepheille',
    link: 'steamcommunity.com/sharedfiles/filedetails/?id=2405396574',
    type: 'patch',
    image: sc210223,
  },
  {
    title: 'Duke Dashington Remastered',
    author: '바람 번역단',
    link: 'blog.naver.com/bleach1491/222196942354',
    type: 'patch',
    image: sc210105,
  },
  {
    title: 'Rev',
    author: '바람 번역단',
    link: 'blog.naver.com/bleach1491/222180900832',
    type: 'patch',
    image: sc201221,
  },
  {
    title: 'Alwa’s Legacy',
    author: '바람 번역단',
    link: 'blog.naver.com/bleach1491/222008221688',
    type: 'patch',
    image: sc200622,
  },
  {
    title: 'Westerado: Double Barreled',
    author: '바람 번역단',
    link: 'blog.naver.com/bleach1491/221820971383',
    type: 'patch',
    image: sc200223,
  },
]

export function Showcase() {
  const linkPrefix = {
    steam: 'https://store.steampowered.com/app/',
    appstore: 'https://apps.apple.com/app/',
    patch: 'https://',
  }

  return (
    <Carousel className='mt-[.5em]' opts={{ align: 'start', loop: true }}>
      <CarouselContent className="-ml-[1em]">
        {games.map((game) => {
          return (
            <CarouselItem key={game.title} className="basis-auto pl-[1em]">
              <figure>
                <img className="h-80" src={game.image.src} alt={game.title} />
                <figcaption className='mt-[.5em]'>
                  <a
                    href={linkPrefix[game.type] + game.link}
                    target="_blank"
                    rel="nofollow noreferrer noopener"
                  >
                    {game.title}
                  </a>{' '}
                  {game.type === 'patch' ? 'by' : '©'} {game.author}{' '}
                  {game.type === 'patch' && '(사용자 패치)'}
                </figcaption>
              </figure>
            </CarouselItem>
          )
        })}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
