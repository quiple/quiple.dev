import type {AstroCookies} from 'astro'

export interface ChzzkCommon {
  code: number
  message: string | null
}

export interface ChzzkChannel extends ChzzkCommon {
  content?: {
    data: [
      {
        channelId: string
        channelName: string
        channelImageUrl: string
        followerCount: number
        verifiedMark: boolean
      },
    ]
  }
}

export interface ChzzkUser extends ChzzkCommon {
  content?: {
    channelId: string
    channelName: string
  }
}

export interface ChzzkToken extends ChzzkCommon {
  content?: {
    accessToken: string
    refreshToken: string
    tokenType: string
    expiresIn: number
  }
}

export interface ChzzkSessionSystem {
  type: string
  data: object
}

export interface ChzzkSessionChat {
  channelId: string
  senderChannelId: string
  profile: {
    nickname: string
    badges: object
    verifiedMark: boolean
  }
  content: string
  emojis: {
    key: string
    value: string
  }
  messageTime: string
}

export interface ChzzkSessionDonation {
  donationType: string
  channelId: string
  donatorChannelId: string
  donatorNickname: string
  payAmount: string
  donationText: string
  emojis: {
    key: string
    value: string
  }
}

export const getUser = async (accessToken: string | undefined): Promise<ChzzkUser> => {
  const response = await fetch('https://openapi.chzzk.naver.com/open/v1/users/me', {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  })
  return await response.json()
}

export const getChannel = async (channelIds: string[], locals: App.Locals) => {
  const {env} = locals.runtime
  const params = new URLSearchParams({
    channelIds: channelIds.join(','),
  })
  const response = await fetch(`https://openapi.chzzk.naver.com/open/v1/channels?${params}`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      'Client-Id': env.CHZZK_CLIENTID,
      'Client-Secret': env.CHZZK_CLIENTSECRET,
    },
  })
  return await response.json()
}

export const createSession = async (accessToken: string | undefined) => {
  const response = await fetch('https://openapi.chzzk.naver.com/open/v1/sessions/auth', {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  })
  return await response.json()
}

export const getSession = async (accessToken: string | undefined) => {
  const params = new URLSearchParams({
    size: '5',
    page: '0',
  })
  const response = await fetch(`https://openapi.chzzk.naver.com/open/v1/sessions?${params}`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  })
  return await response.json()
}

export const subscribeChat = async (accessToken: string | undefined, sessionKey: string) => {
  const params = new URLSearchParams({
    sessionKey: sessionKey,
  })
  const response = await fetch(
    `https://openapi.chzzk.naver.com/open/v1/sessions/events/subscribe/chat?${params}`,
    {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    },
  )
  return await response.json()
}

export const subscribeDonation = async (accessToken: string | undefined, sessionKey: string) => {
  const params = new URLSearchParams({
    sessionKey: sessionKey,
  })
  const response = await fetch(
    `https://openapi.chzzk.naver.com/open/v1/sessions/events/subscribe/donation?${params}`,
    {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    },
  )
  return await response.json()
}

export const refreshAccessToken = async (cookies: AstroCookies, locals: App.Locals) => {
  const {env} = locals.runtime
  const response = await fetch('https://openapi.chzzk.naver.com/auth/v1/token', {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      grantType: 'refresh_token',
      clientId: env.CHZZK_CLIENTID,
      clientSecret: env.CHZZK_CLIENTSECRET,
      refreshToken: cookies.get('refreshToken')?.value,
    }),
  })
  const data: ChzzkToken = await response.json()

  if (data.code === 200 && data.content) {
    console.log('Refresh Access Token:', data)
    cookies.set('accessToken', data.content.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
    })
    return true
  }
  return false
}

export const checkSignedIn = async (cookies: AstroCookies, locals: App.Locals) => {
  if (cookies.has('accessToken')) {
    const user = await getUser(cookies.get('accessToken')?.value)

    if (user.code === 200) {
      console.log('User:', user)
      return true
    }

    if (user.code === 401 && cookies.has('refreshToken')) {
      const refresh = await refreshAccessToken(cookies, locals)

      if (refresh) {
        const user = await getUser(cookies.get('accessToken')?.value)

        if (user.code === 200) {
          console.log('User:', user)
          return true
        }
      }
      return false
    }
    return false
  }
  return false
}
