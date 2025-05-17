import { type CSSProperties } from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { ChevronDownIcon, LanguagesIcon } from 'lucide-react'
import { LOCALES } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { useLocale } from '@/hooks/use-locale'
import { Button, type ButtonProps } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { LedIndicator } from '@/components/status-indicator'

interface LocalSwitcherProps {
  className?: string
  style?: CSSProperties
  variant?: Exclude<ButtonProps['variant'], 'destructive' | 'link'>
  withSet?: '1' | '2'
  withChevron?: boolean
}

export function LocaleSwitcher ({
  className,
  style,
  variant = 'ghost',
  withSet,
  withChevron
}: LocalSwitcherProps) {
  const locale = useLocale()
  const t = useTranslations('Locale')
  const title = t('title')

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className={withChevron ? '[&[data-state=open]>.chevron]:rotate-180' : ''}
      >
        <Button
          className={cn('group', className)}
          style={style}
          size={withSet || withChevron ? 'default' : 'icon'}
          variant={variant}
          title={title}
        >
          <LanguagesIcon
            className='icon stroke-muted-foreground group-hover:stroke-foreground'
            aria-hidden
          />
          {withSet && (
            <span
              className='title font-bold text-sm tracking-wide text-muted-foreground uppercase group-hover:text-foreground'
              aria-hidden
            >
              {withSet === '1'
                ? LOCALES.find(localeItem => localeItem.set1 === locale)!.set1
                : LOCALES.find(localeItem => localeItem.set1 === locale)!.set2}
            </span>
          )}
          {withChevron && (
            <ChevronDownIcon
              className='chevron stroke-foreground transition-transform duration-300'
              aria-hidden
            />
          )}
          <span className='sr-only'>{title}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='min-w-fit'>
        {LOCALES.map((localeItem) => {
          const isActive = localeItem.set1 === locale
          return (
            <DropdownMenuItem
              asChild
              className='cursor-pointer'
              key={`locale-${localeItem.name}`}
            >
              <Link href={'/' + localeItem.set1} prefetch={false}>
                <div className='flex items-center gap-2'>
                  <div
                    className={cn(
                      'size-5 flex items-center justify-center bg-muted border rounded-sm',
                      isActive && '[&>span]:text-foreground'
                    )}
                  >
                    <span
                      className='pt-px text-[0.6875em] font-semibold uppercase leading-none text-muted-foreground'
                      aria-hidden
                    >
                      {localeItem.set1}
                    </span>
                  </div>
                  <span className='font-medium text-base'>
                    {localeItem.name}
                  </span>
                </div>
                <div className='w-5 flex items-center justify-center'>
                  {isActive && <LedIndicator />}
                </div>
              </Link>
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
