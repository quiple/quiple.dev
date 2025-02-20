import {ChzzkAvatar} from '@/components/chzzk/avatar'
import {Button} from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type {ChzzkChannel} from '@/lib/chzzk'
import {LogOut} from 'lucide-react'

export function ChzzkProfile({channel}: {channel: ChzzkChannel}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8">
          <ChzzkAvatar channel={channel} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center">
        <DropdownMenuItem asChild>
          <a href="/chzzk/logout">
            <LogOut /> 로그아웃
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
