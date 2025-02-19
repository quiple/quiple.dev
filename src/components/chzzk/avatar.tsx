import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar'

export function ChzzkAvatar({channel}) {
  return (
    <Avatar>
      <AvatarImage src={channel.content.channelImageUrl} alt={channel.content.channelName} />
      <AvatarFallback>{channel.content.channelName.substring(0, 1)}</AvatarFallback>
    </Avatar>
  )
}
