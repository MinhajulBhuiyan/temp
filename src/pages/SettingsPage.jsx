import { Settings, CheckCircle2, Sun, Moon, Monitor } from 'lucide-react'
import { useTheme } from '../contexts/ThemeProvider'

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center px-3" style={{ height: '72px', borderBottom: '1px solid var(--border-color)', backgroundColor: 'var(--card-bg)' }}>
        <h1 className="text-3xl font-semibold flex items-center gap-2" style={{ color: 'var(--fg)' }}>
          <Settings className="w-8 h-8" />
          Settings
        </h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-4xl">
          {/* Appearance Section */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold mb-6" style={{ color: 'var(--fg)' }}>Appearance</h2>
            
            <div className="rounded-lg p-6" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
              <h3 className="text-base font-medium mb-2" style={{ color: 'var(--fg)' }}>Theme</h3>
              
              <div className="flex gap-3 mt-4">
                {/* Light Theme */}
                <button 
                  onClick={() => setTheme('light')}
                  className="flex flex-col items-center gap-2 px-8 py-4 rounded-lg border transition-all"
                  style={{
                    borderColor: theme === 'light' ? '#00764c' : 'var(--border-color)',
                    backgroundColor: theme === 'light' ? 'rgba(0, 118, 76, 0.05)' : 'var(--card-bg)'
                  }}
                >
                  <Sun className="w-5 h-5" style={{ color: theme === 'light' ? '#00764c' : 'var(--muted-fg)' }} />
                  <span className="text-sm font-medium" style={{ color: theme === 'light' ? '#00764c' : 'var(--fg)' }}>
                    Light
                  </span>
                </button>

                {/* Dark Theme */}
                <button 
                  onClick={() => setTheme('dark')}
                  className="flex flex-col items-center gap-2 px-8 py-4 rounded-lg border transition-all"
                  style={{
                    borderColor: theme === 'dark' ? '#00764c' : 'var(--border-color)',
                    backgroundColor: theme === 'dark' ? 'rgba(0, 118, 76, 0.05)' : 'var(--card-bg)'
                  }}
                >
                  <Moon className="w-5 h-5" style={{ color: theme === 'dark' ? '#00764c' : 'var(--muted-fg)' }} />
                  <span className="text-sm font-medium" style={{ color: theme === 'dark' ? '#00764c' : 'var(--fg)' }}>
                    Dark
                  </span>
                </button>

                {/* System Theme */}
                <button 
                  onClick={() => setTheme('system')}
                  className="flex flex-col items-center gap-2 px-8 py-4 rounded-lg border transition-all"
                  style={{
                    borderColor: theme === 'system' ? '#00764c' : 'var(--border-color)',
                    backgroundColor: theme === 'system' ? 'rgba(0, 118, 76, 0.05)' : 'var(--card-bg)'
                  }}
                >
                  <Monitor className="w-5 h-5" style={{ color: theme === 'system' ? '#00764c' : 'var(--muted-fg)' }} />
                  <span className="text-sm font-medium" style={{ color: theme === 'system' ? '#00764c' : 'var(--fg)' }}>
                    System
                  </span>
                </button>
              </div>
            </div>
          </div>

          <h2 className="text-xl font-semibold mb-6" style={{ color: 'var(--fg)' }}>System Information</h2>

          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="rounded-lg p-6" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
              <div className="text-sm mb-1" style={{ color: 'var(--muted-fg)' }}>API Base URL</div>
              <div className="text-lg font-semibold" style={{ color: 'var(--fg)' }}>http://localhost:8000</div>
            </div>

            <div className="rounded-lg p-6" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
              <div className="text-sm mb-1" style={{ color: 'var(--muted-fg)' }}>Version</div>
              <div className="text-lg font-semibold" style={{ color: 'var(--fg)' }}>1.0.0</div>
            </div>

            <div className="rounded-lg p-6" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
              <div className="text-sm mb-1" style={{ color: 'var(--muted-fg)' }}>Status</div>
              <div className="text-lg font-semibold text-green-600 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                Operational
              </div>
            </div>

            <div className="rounded-lg p-6" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
              <div className="text-sm mb-1" style={{ color: 'var(--muted-fg)' }}>Current Phase</div>
              <div className="text-lg font-semibold" style={{ color: 'var(--fg)' }}>Week 1 - Discovery Complete</div>
            </div>
          </div>

          <div className="pt-8" style={{ borderTop: '1px solid var(--border-color)' }}>
            <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--fg)' }}>Configuration</h2>
            <div className="rounded-lg p-6" style={{ backgroundColor: 'rgba(0, 118, 76, 0.05)', border: '1px solid rgba(0, 118, 76, 0.2)' }}>
              <p className="flex items-center gap-2" style={{ color: 'var(--muted-fg)' }}>
                <Settings className="w-5 h-5" style={{ color: '#00764c' }} />
                Advanced settings and configuration options coming in Week 2
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
