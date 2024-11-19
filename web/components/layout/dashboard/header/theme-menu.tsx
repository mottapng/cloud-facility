'use client'

import { Computer, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'


import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { themes } from '@/constants'

export const ThemeMenu = () => {
  const { theme, setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="ml-auto mr-4">
          {theme === 'light' ? <Sun size={18} /> : <Moon size={18} />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {themes.map((item) => (
          <DropdownMenuItem
            key={item.value}
            onClick={() => {
              setTheme(item.value)

              if (item.value !== 'system') {
                localStorage.setItem('theme', item.value)
              } else {
                localStorage.removeItem('theme')
              }
            }}
            className="flex"
          >
            {item.value === 'light' ? (
              <Sun size={16} />
            ) : item.value === 'dark' ? (
              <Moon size={16} />
            ) : (
              <Computer size={16} />
            )}
            <p className="ml-2">{item.label}</p>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
