import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar'

interface ChzzkChannel {
  content: {
    data: [{
      channelImageUrl: string
      channelName: string
    }]
  }
}

export function ChzzkAvatar({channel}: {channel: ChzzkChannel}) {
  return (
    <Avatar>
      <AvatarImage src={channel.content.data[0].channelImageUrl} alt={channel.content.data[0].channelName} />
      <AvatarFallback>{channel.content.data[0].channelName.substring(0, 1)}</AvatarFallback>
    </Avatar>
  )
}
