import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar'

interface ChzzkChannel {
  content: {
    channelImageUrl: string
    channelName: string
  }
}

export function ChzzkAvatar({channel}: {channel: ChzzkChannel}) {
  return (
    <Avatar>
      <AvatarImage src={channel.content.channelImageUrl} alt={channel.content.channelName} />
      <AvatarFallback>{channel.content.channelName.substring(0, 1)}</AvatarFallback>
    </Avatar>
  )
}
