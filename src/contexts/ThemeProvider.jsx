import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext({
  theme: 'system',
  setTheme: () => null,
})

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem('theme')
    return stored || 'system'
  })

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove('light', 'dark')

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      root.classList.add(systemTheme)
    } else {
      root.classList.add(theme)
    }
  }, [theme])

  useEffect(() => {
    if (theme !== 'system') return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => {
      const root = window.document.documentElement
      root.classList.remove('light', 'dark')
      const systemTheme = mediaQuery.matches ? 'dark' : 'light'
      root.classList.add(systemTheme)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [theme])

  // Apply global grid pattern if enabled in localStorage
  useEffect(() => {
    try {
      const enabled = localStorage.getItem('enableGrid')
      const root = window.document.documentElement
      if (enabled === 'true') {
        root.classList.add('circuit-pattern')
      } else {
        root.classList.remove('circuit-pattern')
      }

      // Keep multiple tabs in sync
      const onStorage = (e) => {
        if (e.key === 'enableGrid') {
          if (e.newValue === 'true') root.classList.add('circuit-pattern')
          else root.classList.remove('circuit-pattern')
        }
      }

      window.addEventListener('storage', onStorage)
      return () => window.removeEventListener('storage', onStorage)
    } catch (err) {
      // ignore (SSR or restricted storage)
    }
  }, [])

  const value = {
    theme,
    setTheme: (newTheme) => {
      localStorage.setItem('theme', newTheme)
      setTheme(newTheme)
    },
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
