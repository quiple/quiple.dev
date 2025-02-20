import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar'
import type {ChzzkChannel} from '@/lib/chzzk'

export function ChzzkAvatar({channel}: {channel: ChzzkChannel}) {
  return (
    <Avatar className="w-6 h-6">
      <AvatarImage
        src={channel.content?.data[0].channelImageUrl}
        alt={channel.content?.data[0].channelName}
      />
      <AvatarFallback>{channel.content?.data[0].channelName.substring(0, 1)}</AvatarFallback>
    </Avatar>
  )
}
