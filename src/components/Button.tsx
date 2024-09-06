import type { ButtonHTMLAttributes } from '@builder.io/qwik'
import { Slot, component$ } from '@builder.io/qwik'

import Spinner from '@/media/spinner.svg?jsx'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  big?: boolean
  loading?: boolean
  primary?: boolean
}

export default component$<ButtonProps>((props) => {
  return (
    <button
      class={[
        'flex',
        'cursor-pointer',
        'flex-wrap',
        'items-center',
        'justify-center',
        'gap-2',
        'transition',
        'rounded-[5px]',
        props.big ? 'p-[6px_7px]' : 'p-[3px_7px]',
        props.disabled
          ? [
              'text-[var(--text-tertiary)]',
              'bg-[rgba(255,255,255,.5)]',
              'shadow-[0_.5px_2.5px_rgba(0,0,0,.15),0_0_0_.5px_rgba(0,0,0,.03)]',
            ]
          : props.primary
            ? [
                'text-white',
                'bg-[linear-gradient(180deg,rgba(255,255,255,.17)_0,transparent_100%)]',
                'bg-[var(--accents-blue)]',
                'shadow-[0_1px_2.5px_rgba(0,122,255,.24),0_0_0_.5px_rgba(0,122,255,.12)]',
              ]
            : [
                'bg-white',
                'shadow-[0_.5px_2.5px_rgba(0,0,0,.3),0_0_0_.5px_rgba(0,0,0,.05)]',
              ],
      ]}>
      {props.loading && <Spinner height="1em" class="stroke-current" />}
      <Slot />
    </button>
  )
})
