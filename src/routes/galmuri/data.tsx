import type { JSXOutput } from '@builder.io/qwik'

import Img200223 from './showcase/200223.png?jsx'
import Img200622 from './showcase/200622.png?jsx'
import Img201221 from './showcase/201221.png?jsx'
import Img210105 from './showcase/210105.png?jsx'
import Img210223 from './showcase/210223.jpg?jsx'
import Img210302 from './showcase/210302.jpg?jsx'
import Img220220 from './showcase/220220.png?jsx'
import Img220507 from './showcase/220507.png?jsx'
import Img220621 from './showcase/220621.jpg?jsx'
import Img221006 from './showcase/221006.webp?jsx'
import Img221127 from './showcase/221127.png?jsx'
import Img230420 from './showcase/230420.png?jsx'
import Img240111_2 from './showcase/240111-2.png?jsx'
import Img240111 from './showcase/240111.png?jsx'
import Img240118 from './showcase/240118.jpg?jsx'
import Img240202 from './showcase/240202.png?jsx'
import Img240218 from './showcase/240218.png?jsx'
import Img240710 from './showcase/240710.jpg?jsx'
import Img240905 from './showcase/240905.jpg?jsx'
import ImgNotYet from './showcase/not-yet.png?jsx'

export interface font {
  name: string
  family: string
  style: string
  size: number
}

export interface game {
  title: string
  author: string
  link: string
  type: 'steam' | 'appstore' | 'patch'
  hash: string
  blurWidth: number
  blurHeight: number
  file: JSXOutput
}

export const fonts: Array<font> = [
  { name: 'Galmuri14', family: 'Galmuri14', style: 'Regular', size: 15 },
  { name: 'Galmuri11', family: 'Galmuri11', style: 'Regular', size: 12 },
  { name: 'Galmuri11 Bold', family: 'Galmuri11', style: 'Bold', size: 12 },
  {
    name: 'Galmuri11 Condensed',
    family: 'Galmuri11',
    style: 'Condensed',
    size: 12,
  },
  { name: 'Galmuri9', family: 'Galmuri9', style: 'Regular', size: 10 },
  { name: 'Galmuri7', family: 'Galmuri7', style: 'Regular', size: 8 },
  {
    name: 'GalmuriMono11',
    family: 'GalmuriMono11',
    style: 'Monospaced',
    size: 12,
  },
  {
    name: 'GalmuriMono9',
    family: 'GalmuriMono9',
    style: 'Monospaced',
    size: 10,
  },
  {
    name: 'GalmuriMono7',
    family: 'GalmuriMono7',
    style: 'Monospaced',
    size: 8,
  },
]

export const showcase: Array<game> = [
  {
    title: 'Keylocker',
    author: 'Moonana',
    link: '1325040',
    type: 'steam',
    hash: 'M59Zj6KD:{EI?0-YIn$,NXaM${S1b-%4I,',
    blurWidth: 5,
    blurHeight: 3,
    file: <ImgNotYet alt="Keylocker" />,
  },
  {
    title: '소년기의 끝',
    author: 'buriki clock',
    link: '2403290',
    type: 'steam',
    hash: 'L69@q*tl00ja_LM{RRt7KMRQxubX',
    blurWidth: 4,
    blurHeight: 3,
    file: <Img240905 alt="소년기의 끝" />,
  },
  {
    title: 'Time Treker',
    author: 'Fuse Game',
    link: '2776500',
    type: 'steam',
    hash: 'MA9b8{jZ00X9~CO[Q.S{kCxaT1a0$$jEJ-',
    blurWidth: 5,
    blurHeight: 3,
    file: <Img240710 alt="Time Treker" />,
  },
  {
    title: 'ZeroRanger',
    author: 'Robeureu',
    link: 'blog.naver.com/robeureu/223357336308',
    type: 'patch',
    hash: 'cFB.}zNuEg~VEMs,-;R6+u,@IBRP^4V@M{',
    blurWidth: 3,
    blurHeight: 5,
    file: <Img240218 alt="ZeroRanger" />,
  },
  {
    title: 'STONKS-9800',
    author: 'TERNOX',
    link: '1539140',
    type: 'steam',
    hash: 'M9G9U5Mx00yE4n-@MKVYk8Sd00.9.SMw$z',
    blurWidth: 5,
    blurHeight: 3,
    file: <Img240202 alt="STONKS-9800" />,
  },
  {
    title: '미제사건은 끝내야 하니까',
    author: 'Somi',
    link: '2676840',
    type: 'steam',
    hash: 'M05E,3~q-:D$00004nIUxu?c00-;kW%gf5',
    blurWidth: 5,
    blurHeight: 3,
    file: <Img240118 alt="미제사건은 끝내야 하니까" />,
  },
  {
    title: 'VVVVVV',
    author: 'Terry Cavanagh',
    link: '70300',
    type: 'steam',
    hash: 'L52*q4yUQqVtY=VuXNkCUQQ;c8oy',
    blurWidth: 4,
    blurHeight: 3,
    file: <Img240111_2 alt="VVVVVV" />,
  },
  {
    title: 'Momodora: Moonlit Farewell',
    author: 'Bombservice',
    link: '1747760',
    type: 'steam',
    hash: 'M04UTr~V0eOq560dE2#?aLrr_4~V?FRjSx',
    blurWidth: 5,
    blurHeight: 3,
    file: <Img240111 alt="Momodora: Moonlit Farewell" />,
  },
  {
    title: 'Coffee Talk Episode 2: Hibiscus & Butterfly',
    author: 'Toge Productions',
    link: '1663220',
    type: 'steam',
    hash: 'MPBg3p_N.7NH9ZROnNRiWBoMR5iwV@bItR',
    blurWidth: 5,
    blurHeight: 3,
    file: <Img230420 alt="Coffee Talk Episode 2: Hibiscus & Butterfly" />,
  },
  {
    title: 'Papers, Please',
    author: 'Lucas Pope',
    link: '239030',
    type: 'steam',
    hash: 'M567G.jt0zbH|1}sj[5lay;OEzfQ$PfQOD',
    blurWidth: 5,
    blurHeight: 3,
    file: <Img221127 alt="Papers, Please" />,
  },
  {
    title: 'Dungeon Squad',
    author: 'GameCoaster',
    link: '1642733080',
    type: 'appstore',
    hash: 'M6DS?@Hq0dDN004.oMxXROxu00%#=zgQ~o',
    blurWidth: 5,
    blurHeight: 3,
    file: <Img221006 alt="Dungeon Squad" />,
  },
  {
    title: 'Shotgun King: The Final Checkmate',
    author: 'PUNKCAKE Delicieux',
    link: '1972440',
    type: 'steam',
    hash: 'MJC~xdD*~A9axuoeRjxuR*t6IUt7NHofa}',
    blurWidth: 5,
    blurHeight: 3,
    file: <Img220621 alt="Shotgun King: The Final Checkmate" />,
  },
  {
    title: 'Monster Sanctuary',
    author: '솔라리어스',
    link: 'blog.naver.com/ansewo/222702695752',
    type: 'patch',
    hash: 'M=BOgeV@WBadWB%%WAj?j=aytmbHj]oKfl',
    blurWidth: 5,
    blurHeight: 3,
    file: <Img220507 alt="Monster Sanctuary" />,
  },
  {
    title: 'NEEDY GIRL OVERDOSE',
    author: '코스믹딜루즈 & quiple',
    link: 'cosmicdeluge.tistory.com/5',
    type: 'patch',
    hash: 'M6O|9XD+00~V00o5oeyoogpZEf-:4p56S#',
    blurWidth: 5,
    blurHeight: 3,
    file: <Img220220 alt="NEEDY GIRL OVERDOSE" />,
  },
  {
    title: 'Teamfight Manager',
    author: 'Team Samoyed',
    link: '1372810',
    type: 'steam',
    hash: 'MCHw}vo00tjs56?wWpR%WVbV02S3]~S4=r',
    blurWidth: 5,
    blurHeight: 3,
    file: <Img210302 alt="Teamfight Manager" />,
  },
  {
    title: 'BLUE REVOLVER',
    author: 'Sepheille',
    link: 'steamcommunity.com/sharedfiles/filedetails/?id=2405396574',
    type: 'patch',
    hash: 'M4688ER*00XS%M01WB^+s9NG~poJ4oW=%L',
    blurWidth: 5,
    blurHeight: 3,
    file: <Img210223 alt="BLUE REVOLVER" />,
  },
  {
    title: 'Duke Dashington Remastered',
    author: '바람 번역단',
    link: 'blog.naver.com/bleach1491/222196942354',
    type: 'patch',
    hash: 'MjH2i#yDDie-NG_4xuROkCaeIVnjxuogoc',
    blurWidth: 5,
    blurHeight: 3,
    file: <Img210105 alt="Duke Dashington Remastered" />,
  },
  {
    title: 'Rev',
    author: '바람 번역단',
    link: 'blog.naver.com/bleach1491/222180900832',
    type: 'patch',
    hash: 'M46kt.t700aL~p.7ayMyofR*DjRQ-;oy4.',
    blurWidth: 5,
    blurHeight: 3,
    file: <Img201221 alt="Rev" />,
  },
  {
    title: 'Alwa’s Legacy',
    author: '바람 번역단',
    link: 'blog.naver.com/bleach1491/222008221688',
    type: 'patch',
    hash: 'MHFE4-RpS=nOAI{JxCR;xaEyNXjDSkwdbX',
    blurWidth: 5,
    blurHeight: 3,
    file: <Img200622 alt="Alwa’s Legacy" />,
  },
  {
    title: 'Westerado: Double Barreled',
    author: '바람 번역단',
    link: 'blog.naver.com/bleach1491/221820971383',
    type: 'patch',
    hash: 'MLQQ+Z^hn59x$KxoS~?sRROYqDOYr=$yIX',
    blurWidth: 5,
    blurHeight: 3,
    file: <Img200223 alt="Westerado: Double Barreled" />,
  },
]

export const pangramEn = [
  // English pangrams
  'The quick brown fox jumps over the lazy dog',
  'Glib jocks quiz nymph to vex dwarf',
  'How quickly daft jumping zebras vex',
  'Waltz, bad nymph, for quick jigs vex',
  'Sphinx of black quartz, judge my vow',
  'The five boxing wizards jump quickly',
  'Jackdaws love my big sphinx of quartz',
  'Pack my box with five dozen liquor jugs',
  'Go, lazy fat vixen; be shrewd, jump quick',
  'When zombies arrive, quickly fax Judge Pat',
  'Amazingly few discotheques provide jukeboxes',
  'Puzzled women bequeath jerks very exotic gifts',
  'The quick onyx goblin jumps over the lazy dwarf',
  'Brawny gods just flocked up to quiz and vex him',
  'Watch “Jeopardy!”, Alex Trebek’s fun TV quiz game',
  'My faxed joke won a pager in the cable TV quiz show',
  'Six big devils from Japan quickly forgot how to waltz',
  'Five or six big jet planes zoomed quickly by the tower',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  'Jack amazed a few girls by dropping the antique onyx vase',
  'Grumpy wizards make toxic brew for the evil Queen and Jack',
  'A quick movement of the enemy will jeopardize six gunboats',
  'Jaded zombies acted quaintly but kept driving their oxen forward',
  // lyrics
  'Thank you sex', // wasureranneyo
  'But the moon’s not burning through my skin tonight', // dom fera
  'I wanna be an ordinary man, not just an ego caught inside a trend', // monkey majik
]

export const pangramKo = [
  // Korean pangrams
  '다람쥐 헌 쳇바퀴에 타고파',
  '동녘 구름 틈새로 퍼지는 햇빛',
  '그는 미쳐서 칼부림하는 인성파탄자일 뿐이다',
  '추운 겨울에는 따뜻한 커피와 티를 마셔야지요',
  '정 참판 양반댁 규수 큰 교자 타고 혼례 치른 날',
  '꽃을 잘 키우려면 수분과 윤기 먹은 토양이 필요하다',
  '덧글은 통신 예절 지키면서 표현 자유 추구하는 방향으로',
  '컴퓨터 출판물의 양이 늘면 타입킷의 활용도 많아지게 된다',
  '참나무 타는 소리와 야경만큼 밤의 여유를 표현해 주는 것도 없다',
  '키스의 고유 조건은 입술끼리 만나야 하고 특별한 기술은 필요치 않다',
  '콩고물과 우유가 들어간 빙수는 차게 먹어야 특별한 맛이 잘 표현된다',
  // lyrics
  '세상은 그것을 사랑이라고 부른다', // sambomaster
  '울고 싶은 순간에 눈물은 나오는가', // eastern youth
  '더러운 안경이 푸르게 물들면 발을 울리며 나도 웃으리라', // eastern youth
  '아직 산 채로 끝나지 않은 이 몸이라면 죄도 악도 나와 더불어 있으니', // eastern youth
  '물러난 백색충은 산탄총에 흩날리고 푸른 하늘을 꿈꾸며 피아노 선이 되었네', // cock roach
  '오늘 밤은 연회, 붉은 고기를 먹는다\n우리를 업신여긴 그 자식의 고기를 먹는다', // cock roach
  '한 번뿐인 인생이니까 좋은 추억을 만들자', // seiko oomori
  '강은 바다로 넓어지고 사람은 죽음으로 넘치네', // seiko oomori
  '네가 좋아하는 일이 바로 너만이 할 수 있는 일이야', // seiko oomori
  '그 한 번의 실수로 모든 것을 부정당해도 기죽지 마', // seiko oomori
  '기적은 손수 만드는 것이고 모든 것은 땅으로 이어진다', // seiko oomori
  '새벽녘의 기억은 흐릿하고 집에 돌아가기 위해 살아 있는 몸', // seiko oomori
  '사랑해 달란 말을 하지 않는 이유는 아침해가 눈부셔서, 그저 그것뿐', // seiko oomori
  '내 꿈은 네가 걷어찬 못생기고 너덜너덜한 삶을 주워모아서 커다란 거울을 만드는 것', // seiko oomori
  '아름답게 살고 싶을 뿐', // pop never dies
  '우리는 역시 지리멸렬히 사랑하고 사랑받지 않겠는가', // pop never dies
  '사막에서 걷는 법을 알려줘\n신발에 모래가 들어가서 발을 델 것 같아', // pop never dies
  '옥상 끝에서 난간을 잡고 하늘을 올려다봐\n아래를 내려다보면 빨려들어가 내딛고 싶어지니까', // pop never dies
  '하늘을 올려다봐도 하늘밖에 없다', // wasureranneyo
  '여태껏 우리의 음악을 깔봐온 그 자식을 음악의 힘으로 뛰어넘고 싶어', // wasureranneyo
  '그러니 우리 우연히라도 그때의 맘 그날의 밤 떠오르게 만들지는 마요', // busker busker
  '신께서는 이 세상을 엿새만에 만드시고 이레째에 마술을 했다고 한다', // suichu sorewa kurushii
  '너희처럼 살고 싶지 않다며 소설가를 믿은 채 열여덟살의 사상을 모두 꽃으로 만들었네', // seesooany
  '한 번 눈을 감고 점점 낙담해간 내가 저 앞에서는 웃고 있어', // kuhakugokko
  '흔해빠진 말로도 다정함이 오고가서 절묘한 곳으로 만들어 주네', // another infinity
  // memes
  '뭉탱이로 있다가 유링게숭 아니그냥',
  '맛스타 해외승인 직불출금 십이만천육백팔십칠원',
  '마즈피플 코스프레 나도 이제 할 수 있다 (너도 할 수 있다)',
  '마즈피플 지구인들과 친해지고 싶다\n지구의 피자와 햄버거가 그렇게 맛있다던데',
  '자기가 잘 못해서 죽어놓고 게임 탓하고 있으면 누가 그걸 보고 좋아하겠어요',
]
