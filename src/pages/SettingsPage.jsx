import { Settings, Sun, Moon, Monitor } from 'lucide-react'
import { useTheme } from '../contexts/ThemeProvider'

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div
        className="flex items-center px-3"
        style={{
          height: '72px',
          borderBottom: '1px solid var(--border-color)',
          backgroundColor: 'var(--card-bg)',
          boxShadow: '0 1px 3px rgba(2,6,23,0.06)'
        }}
      >
        <h1 className="text-3xl font-semibold flex items-center gap-2" style={{ color: 'var(--fg)' }}>
          <Settings className="w-8 h-8" />
          Settings
        </h1>
      </div>

      {/* Content Area with Pattern */}
      <div className="flex-1 overflow-y-auto circuit-pattern">
        <div className="max-w-4xl mx-auto p-8 relative z-10">
          {/* Appearance Section */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold mb-6" style={{ color: 'var(--fg)' }}>Appearance</h2>
            
            <div className="flex gap-3 mt-4">
              {/* Light Theme */}
              <button 
                onClick={() => setTheme('light')}
                className="flex flex-col items-center gap-2 px-8 py-4 rounded-lg border transition-all cursor-pointer"
                style={{
                  borderColor: theme === 'light' ? '#188e49' : 'var(--border-color)',
                  backgroundColor: theme === 'light' ? '#188e49' : 'var(--card-bg)'
                }}
                onMouseEnter={(e) => {
                  if (theme !== 'light') {
                    e.currentTarget.style.backgroundColor = 'var(--sql-toggle-hover)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (theme !== 'light') {
                    e.currentTarget.style.backgroundColor = 'var(--card-bg)'
                  }
                }}
              >
                <Sun className="w-5 h-5" style={{ color: theme === 'light' ? '#ffffff' : 'var(--muted-fg)' }} />
                <span className="text-sm font-medium" style={{ color: theme === 'light' ? '#ffffff' : 'var(--fg)' }}>
                  Light
                </span>
              </button>

              {/* Dark Theme */}
              <button 
                onClick={() => setTheme('dark')}
                className="flex flex-col items-center gap-2 px-8 py-4 rounded-lg border transition-all cursor-pointer"
                style={{
                  borderColor: theme === 'dark' ? '#188e49' : 'var(--border-color)',
                  backgroundColor: theme === 'dark' ? '#188e49' : 'var(--card-bg)'
                }}
                onMouseEnter={(e) => {
                  if (theme !== 'dark') {
                    e.currentTarget.style.backgroundColor = 'var(--sql-toggle-hover)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (theme !== 'dark') {
                    e.currentTarget.style.backgroundColor = 'var(--card-bg)'
                  }
                }}
              >
                <Moon className="w-5 h-5" style={{ color: theme === 'dark' ? '#ffffff' : 'var(--muted-fg)' }} />
                <span className="text-sm font-medium" style={{ color: theme === 'dark' ? '#ffffff' : 'var(--fg)' }}>
                  Dark
                </span>
              </button>

              {/* System Theme */}
              <button 
                onClick={() => setTheme('system')}
                className="flex flex-col items-center gap-2 px-8 py-4 rounded-lg border transition-all cursor-pointer"
                style={{
                  borderColor: theme === 'system' ? '#188e49' : 'var(--border-color)',
                  backgroundColor: theme === 'system' ? '#188e49' : 'var(--card-bg)'
                }}
                onMouseEnter={(e) => {
                  if (theme !== 'system') {
                    e.currentTarget.style.backgroundColor = 'var(--sql-toggle-hover)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (theme !== 'system') {
                    e.currentTarget.style.backgroundColor = 'var(--card-bg)'
                  }
                }}
              >
                <Monitor className="w-5 h-5" style={{ color: theme === 'system' ? '#ffffff' : 'var(--muted-fg)' }} />
                <span className="text-sm font-medium" style={{ color: theme === 'system' ? '#ffffff' : 'var(--fg)' }}>
                  System
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
