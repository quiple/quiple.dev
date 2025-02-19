import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar'

export function ChzzkAvatar() {
  return (
    <Avatar>
      <AvatarImage src="https://github.com/shadcnquiple.png" alt="@shadcn" />
      <AvatarFallback>quiple</AvatarFallback>
    </Avatar>
  )
}
