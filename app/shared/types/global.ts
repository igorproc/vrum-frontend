// Types & Interfaces
import type { NuxtLinkProps } from '#app/components/nuxt-link'
import type { TUiIconNames } from '#build/types/ui-icon'

export type TNavigationDrawerLinkListItem = {
  key: string | number,
  label: string,
  disabled: boolean,
  prependIcon: TUiIconNames,
  link: NuxtLinkProps['to'],
}
