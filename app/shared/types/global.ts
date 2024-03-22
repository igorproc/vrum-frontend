// Types & Interfaces
import type { NuxtLinkProps } from '#app/components/nuxt-link'

export type TNavigationDrawerLinkListItem = {
  key: string | number,
  label: string,
  disabled: boolean,
  link: NuxtLinkProps['to']
}
