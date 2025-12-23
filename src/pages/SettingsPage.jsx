import { Settings, CheckCircle2 } from 'lucide-react'

export default function SettingsPage() {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white flex items-center px-3" style={{ height: '72px' }}>
        <h1 className="text-3xl font-semibold text-gray-900 flex items-center gap-2">
          <Settings className="w-8 h-8" />
          Settings
        </h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-4xl">
          <h2 className="text-xl font-semibold mb-6">System Information</h2>

          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="text-sm text-gray-500 mb-1">API Base URL</div>
              <div className="text-lg font-semibold text-gray-900">http://localhost:8000</div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="text-sm text-gray-500 mb-1">Version</div>
              <div className="text-lg font-semibold text-gray-900">1.0.0</div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="text-sm text-gray-500 mb-1">Status</div>
              <div className="text-lg font-semibold text-green-600 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                Operational
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="text-sm text-gray-500 mb-1">Current Phase</div>
              <div className="text-lg font-semibold text-gray-900">Week 1 - Discovery Complete</div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8">
            <h2 className="text-xl font-semibold mb-4">Configuration</h2>
            <div className="rounded-lg p-6" style={{ backgroundColor: '#ecf7f1', borderColor: '#e6efe9', borderWidth: '1px' }}>
              <p className="text-gray-600 flex items-center gap-2">
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
