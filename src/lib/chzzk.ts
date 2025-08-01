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

export interface ChzzkSession extends ChzzkCommon {
  content?: {
    url: string
  }
}

export interface ChzzkSessionList extends ChzzkCommon {
  content?: {
    data: [
      {
        sessionKey: string
        connectedDate: string
        disconnectedDate: string
        subscribedEvents: [
          {
            eventType: string
            channelId: String
          },
        ]
      },
    ]
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

export const getToken = async (refresh: boolean, locals: App.Locals, searchParams?: URLSearchParams, cookies?: AstroCookies): Promise<ChzzkToken> => {
  const {env} = locals.runtime
  const response = await fetch('https://openapi.chzzk.naver.com/auth/v1/token', {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      grantType: refresh ? 'refresh_token' : 'authorization_code',
      clientId: env.CHZZK_CLIENTID,
      clientSecret: env.CHZZK_CLIENTSECRET,
      code: !refresh && searchParams?.get('code'),
      state: !refresh && searchParams?.get('state'),
      refreshToken: refresh && cookies?.get('refreshToken')?.value,
    }),
  })
  return await response.json()
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

export const getChannel = async (
  channelIds: string[],
  locals: App.Locals,
): Promise<ChzzkChannel> => {
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

export const createSession = async (accessToken: string | undefined): Promise<ChzzkSession> => {
  const response = await fetch('https://openapi.chzzk.naver.com/open/v1/sessions/auth', {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  })
  return await response.json()
}

export const getSession = async (accessToken: string | undefined): Promise<ChzzkSessionList> => {
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
  const data = await getToken(true, locals, undefined, cookies)

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
