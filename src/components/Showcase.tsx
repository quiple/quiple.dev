import { Image } from 'astro:assets'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
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
import sc240111 from '@/assets/showcase/240111.png'
import sc240111_2 from '@/assets/showcase/240111-2.png'
import sc240118 from '@/assets/showcase/240118.jpg'
import sc240202 from '@/assets/showcase/240202.png'
import sc240218 from '@/assets/showcase/240218.png'
import sc240710 from '@/assets/showcase/240710.jpg'
import sc240905 from '@/assets/showcase/240905.jpg'
import sc240919 from '@/assets/showcase/240919.png'

const games: game[] = [
  {
    title: 'Keylocker',
    author: 'Moonana',
    link: '1325040',
    type: 'steam',
  },
  {
    title: '소년기의 끝',
    author: 'buriki clock',
    link: '2403290',
    type: 'steam',
  },
  {
    title: 'Time Treker',
    author: 'Fuse Game',
    link: '2776500',
    type: 'steam',
  },
  {
    title: 'ZeroRanger',
    author: 'Robeureu',
    link: 'blog.naver.com/robeureu/223357336308',
    type: 'patch',
  },
  {
    title: 'STONKS-9800',
    author: 'TERNOX',
    link: '1539140',
    type: 'steam',
  },
  {
    title: '미제사건은 끝내야 하니까',
    author: 'Somi',
    link: '2676840',
    type: 'steam',
  },
  {
    title: 'VVVVVV',
    author: 'Terry Cavanagh',
    link: '70300',
    type: 'steam',
  },
  {
    title: 'Momodora: Moonlit Farewell',
    author: 'Bombservice',
    link: '1747760',
    type: 'steam',
  },
  {
    title: 'Coffee Talk Episode 2: Hibiscus & Butterfly',
    author: 'Toge Productions',
    link: '1663220',
    type: 'steam',
  },
  {
    title: 'Papers, Please',
    author: 'Lucas Pope',
    link: '239030',
    type: 'steam',
  },
  {
    title: 'Dungeon Squad',
    author: 'GameCoaster',
    link: '1642733080',
    type: 'appstore',
  },
  {
    title: 'Shotgun King: The Final Checkmate',
    author: 'PUNKCAKE Delicieux',
    link: '1972440',
    type: 'steam',
  },
  {
    title: 'Monster Sanctuary',
    author: '솔라리어스',
    link: 'blog.naver.com/ansewo/222702695752',
    type: 'patch',
  },
  {
    title: 'NEEDY GIRL OVERDOSE',
    author: '코스믹딜루즈 & quiple',
    link: 'cosmicdeluge.tistory.com/5',
    type: 'patch',
  },
  {
    title: 'Teamfight Manager',
    author: 'Team Samoyed',
    link: '1372810',
    type: 'steam',
  },
  {
    title: 'BLUE REVOLVER',
    author: 'Sepheille',
    link: 'steamcommunity.com/sharedfiles/filedetails/?id=2405396574',
    type: 'patch',
  },
  {
    title: 'Duke Dashington Remastered',
    author: '바람 번역단',
    link: 'blog.naver.com/bleach1491/222196942354',
    type: 'patch',
  },
  {
    title: 'Rev',
    author: '바람 번역단',
    link: 'blog.naver.com/bleach1491/222180900832',
    type: 'patch',
  },
  {
    title: 'Alwa’s Legacy',
    author: '바람 번역단',
    link: 'blog.naver.com/bleach1491/222008221688',
    type: 'patch',
  },
  {
    title: 'Westerado: Double Barreled',
    author: '바람 번역단',
    link: 'blog.naver.com/bleach1491/221820971383',
    type: 'patch',
  },
]

interface game {
  title: string
  author: string
  link: string
  type: 'steam' | 'appstore' | 'patch'
}

export function Showcase() {
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
        {games.map((game) => {
          return (
            <CarouselItem key={game.title}>
              <Image src={sc220507} alt={game.title} />
              {game.title} &copy; {game.author}
            </CarouselItem>
          )
        })}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
