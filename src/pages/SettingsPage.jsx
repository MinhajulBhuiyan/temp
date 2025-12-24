import { useEffect, useState } from 'react'
import { Settings, Sun, Moon, Monitor } from 'lucide-react'
import { useTheme } from '../contexts/ThemeProvider'

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()

  const [apiBaseUrl, setApiBaseUrl] = useState(() => localStorage.getItem('apiBaseUrl') || 'http://localhost:8000')
  const [showSQLDefault, setShowSQLDefault] = useState(() => {
    const v = localStorage.getItem('showSQLDefault')
    return v === null ? true : v === 'true'
  })
  const [currentPhase, setCurrentPhase] = useState(() => localStorage.getItem('currentPhase') || 'Week 1 - Discovery Complete')

  useEffect(() => {
    localStorage.setItem('apiBaseUrl', apiBaseUrl)
  }, [apiBaseUrl])

  useEffect(() => {
    localStorage.setItem('showSQLDefault', showSQLDefault)
  }, [showSQLDefault])

  // Ensure any legacy background grid classes/vars are removed
  useEffect(() => {
    try {
      const root = window.document.documentElement
      root.classList.remove('circuit-pattern')
      root.style.removeProperty('--grid-opacity')
    } catch (err) {
      // ignore in non-browser environments
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('currentPhase', currentPhase)
  }, [currentPhase])

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div
        className="flex items-center px-3 relative z-20"
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

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto relative z-10">
        <div className="max-w-4xl mx-auto p-8 relative z-10">
          {/* Appearance Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--fg)' }}>Appearance</h2>

            <div className="flex gap-3 mt-4">
              {/* Light Theme */}
              <button
                onClick={() => setTheme('light')}
                className="flex flex-col items-center gap-2 px-8 py-4 rounded-lg border transition-all cursor-pointer"
                style={{
                  borderColor: theme === 'light' ? '#188e49' : 'var(--border-color)',
                  backgroundColor: theme === 'light' ? '#188e49' : 'var(--card-bg)'
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
              >
                <Monitor className="w-5 h-5" style={{ color: theme === 'system' ? '#ffffff' : 'var(--muted-fg)' }} />
                <span className="text-sm font-medium" style={{ color: theme === 'system' ? '#ffffff' : 'var(--fg)' }}>
                  System
                </span>
              </button>
            </div>
          </div>

          {/* System Information & Controls */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--fg)' }}>System Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="rounded-lg p-6" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
                <label className="text-sm mb-1 block" style={{ color: 'var(--muted-fg)' }}>API Base URL</label>
                <div className="flex items-center gap-2">
                  <input
                    value={apiBaseUrl}
                    onChange={(e) => setApiBaseUrl(e.target.value)}
                    className="w-full px-3 py-2 rounded border" 
                    style={{ backgroundColor: 'var(--bg)', border: '1px solid var(--border-color)', color: 'var(--fg)' }}
                  />
                </div>
              </div>

              <div className="rounded-lg p-6" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
                <label className="text-sm mb-1 block" style={{ color: 'var(--muted-fg)' }}>Version</label>
                <div className="text-lg font-semibold" style={{ color: 'var(--fg)' }}>1.0.0</div>
              </div>

              <div className="rounded-lg p-6" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
                <label className="text-sm mb-1 block" style={{ color: 'var(--muted-fg)' }}>Status</label>
                <div className="text-lg font-semibold flex items-center gap-2" style={{ color: '#188e49' }}>
                  Operational
                </div>
              </div>

              <div className="rounded-lg p-6" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
                <label className="text-sm mb-1 block" style={{ color: 'var(--muted-fg)' }}>Current Phase</label>
                <input
                  value={currentPhase}
                  onChange={(e) => setCurrentPhase(e.target.value)}
                  className="w-full px-3 py-2 rounded border"
                  style={{ backgroundColor: 'var(--bg)', border: '1px solid var(--border-color)', color: 'var(--fg)' }}
                />
              </div>
            </div>

            <div className="flex items-start gap-6 flex-wrap">
              <div className="custom-toggle-container">
                <div className="custom-toggle">
                  <input
                    id="show-sql"
                    type="checkbox"
                    className="custom-toggle__input"
                    checked={showSQLDefault}
                    onChange={(e) => setShowSQLDefault(e.target.checked)}
                  />
                  <label htmlFor="show-sql" className="custom-toggle__label">
                    <span className="custom-toggle__custom" />
                    Show SQL by default
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4" style={{ borderTop: '1px solid var(--border-color)' }}>
            <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--fg)' }}>Configuration</h2>
            <div
              className="rounded-lg p-6"
              style={{
                backgroundColor: theme === 'dark' ? '#1e293b' : 'var(--card-bg)',
                border: '1px solid var(--border-color)'
              }}
            >
              <p className="flex items-center gap-2" style={{ color: 'var(--muted-fg)' }}>
                <Settings className="w-5 h-5" style={{ color: '#188e49' }} />
                Advanced settings and configuration options coming in Week 2
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
