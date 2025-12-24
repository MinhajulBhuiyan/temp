import { useState, useEffect } from 'react'
import { RefreshCw, ChevronDown, ChevronUp } from 'lucide-react'
import api from '../utils/api'
import {
  Trash2,
  Database,
  BarChart2,
  PlusSquare,
  Activity,
  CheckCircle,
  XCircle,
  Zap,
  Settings,
} from 'lucide-react'

export default function DiscoveryPage() {
  const [activeTab, setActiveTab] = useState('databases')
  const [databases, setDatabases] = useState([])
  const [tablesData, setTablesData] = useState({})
  const [expandedDb, setExpandedDb] = useState({})
  const [loading, setLoading] = useState(false)
  const [removingDb, setRemovingDb] = useState({})

  useEffect(() => {
    fetchDatabases()
  }, [])

  const fetchDatabases = async () => {
    try {
      setLoading(true)
      const response = await api.get('/datasource/list')
      setDatabases(response.data)
      
      // Fetch tables for each database
      for (const db of response.data) {
        fetchTables(db.source_id)
      }
    } catch (error) {
      console.error('Error fetching databases:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchTables = async (sourceId) => {
    try {
      const response = await api.get(`/discovery/tables/${sourceId}`)
      if (response.data.success) {
        setTablesData(prev => ({
          ...prev,
          [sourceId]: response.data.data.tables
        }))
      }
    } catch (error) {
      console.error('Error fetching tables:', error)
    }
  }

  const quickAddDataSense = async () => {
    try {
      await api.post('/datasource/quick-add-datasense')
      alert('✅ DataSense database added successfully!')
      fetchDatabases()
    } catch (error) {
      alert('❌ Failed to add database')
    }
  }

  const startDiscovery = async (sourceId) => {
    try {
      await api.post('/discovery/start', { source_id: sourceId })
      alert('✅ Discovery started! This may take 2-5 minutes.')
      setTimeout(() => fetchTables(sourceId), 5000)
    } catch (error) {
      alert('❌ Failed to start discovery')
    }
  }

  const removeDatasource = async (sourceId) => {
    const ok = window.confirm('Are you sure you want to disconnect this database?')
    if (!ok) return

    try {
      setRemovingDb(prev => ({ ...prev, [sourceId]: true }))
      await api.delete(`/datasource/${sourceId}`)
      alert('✅ Database disconnected')
      // refresh list
      fetchDatabases()
    } catch (error) {
      console.error('Failed to remove datasource', error)
      alert('❌ Failed to disconnect database')
    } finally {
      setRemovingDb(prev => ({ ...prev, [sourceId]: false }))
    }
  }

  const toggleExpanded = (sourceId) => {
    setExpandedDb(prev => ({
      ...prev,
      [sourceId]: !prev[sourceId]
    }))
  }

  return (
    <div className="h-full flex flex-col circuit-pattern" style={{ backgroundColor: 'var(--muted-bg)' }}>
      {/* Header */}
      <div className="px-8 py-6" style={{ backgroundColor: 'var(--card-bg)', borderBottom: '1px solid var(--border-color)' }}>
        <h1 className="text-3xl font-semibold flex items-center gap-3" style={{ color: 'var(--fg)' }}>
          <Database size={28} style={{ color: '#188e49' }} />
          Database Discovery
        </h1>
      </div>

      {/* Tabs */}
      <div className="px-8" style={{ backgroundColor: 'var(--card-bg)', borderBottom: '1px solid var(--border-color)' }}>
        <nav className="flex gap-8">
          {['databases', 'add', 'status'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab ? 'border-transparent' : 'border-transparent hover:opacity-80'
              }`}
              style={activeTab === tab ? { color: '#188e49', borderBottomColor: '#188e49' } : { color: 'var(--muted-fg)' }}
            >
              {tab === 'databases' && (
                <>
                  <BarChart2 size={16} className="inline-block mr-2" />
                  My Databases
                </>
              )}

              {tab === 'add' && (
                <>
                  <PlusSquare size={16} className="inline-block mr-2" />
                  Add Database
                </>
              )}

              {tab === 'status' && (
                <>
                  <Activity size={16} className="inline-block mr-2" />
                  Discovery Status
                </>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-8 circuit-pattern">
        {activeTab === 'databases' && (
          <div className="max-w-5xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold" style={{ color: 'var(--fg)' }}>Connected Databases</h2>
              <button
                onClick={fetchDatabases}
                className="px-4 py-2 text-sm flex items-center gap-2 hover:opacity-80"
                style={{ color: 'var(--muted-fg)' }}
              >
                <RefreshCw size={16} />
                Refresh
              </button>
            </div>

            {loading ? (
              <div className="text-center py-12" style={{ color: 'var(--muted-fg)' }}>Loading...</div>
            ) : databases.length === 0 ? (
              <div className="text-center py-12 rounded-lg" style={{ backgroundColor: 'var(--card-bg)' }}>
                <p style={{ color: 'var(--muted-fg)' }}>No databases connected yet.</p>
                <p className="text-sm mt-2" style={{ color: 'var(--muted-fg)' }}>Add one in the "Add Database" tab.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {databases.map((db) => {
                  const tables = tablesData[db.source_id] || []
                  const isExpanded = expandedDb[db.source_id]
                  
                  return (
                    <div key={db.source_id} className="rounded-lg overflow-hidden" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold flex items-center gap-2" style={{ color: 'var(--fg)' }}>
                              <Database size={18} style={{ color: 'var(--muted-fg)' }} />
                              {db.name} ({db.db_type.toUpperCase()})
                            </h3>
                            <p className="text-sm mt-1" style={{ color: 'var(--muted-fg)' }}>
                              {db.host}:{db.port} / {db.database}
                            </p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            db.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                          }`}>
                            {db.is_active ? (
                              <span className="flex items-center gap-2">
                                <CheckCircle size={14} className="text-green-600" />
                                Active
                              </span>
                            ) : (
                              <span className="flex items-center gap-2">
                                <XCircle size={14} className="text-red-600" />
                                Inactive
                              </span>
                            )}
                          </span>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                          <div>
                            <span style={{ color: 'var(--muted-fg)' }}>Discovered:</span>
                            <span className="ml-2" style={{ color: 'var(--fg)' }}>
                              {db.discovered_at ? new Date(db.discovered_at).toLocaleString() : 'N/A'}
                            </span>
                          </div>
                          <div>
                            <span style={{ color: 'var(--muted-fg)' }}>Tables:</span>
                            <span className="ml-2 font-semibold" style={{ color: 'var(--fg)' }}>
                              {tables.length}
                            </span>
                          </div>
                          <div>
                            <span style={{ color: 'var(--muted-fg)' }}>Total Rows:</span>
                            <span className="ml-2 font-semibold" style={{ color: 'var(--fg)' }}>
                              {tables.reduce((sum, t) => sum + t.row_count, 0).toLocaleString()}
                            </span>
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <button
                            onClick={() => startDiscovery(db.source_id)}
                            style={{ backgroundColor: '#188e49' }}
                            className="px-4 py-2 text-white rounded-lg hover:brightness-90 transition-colors text-sm flex items-center gap-2"
                          >
                            <RefreshCw size={16} />
                            Rediscover
                          </button>
                          <button
                            onClick={() => removeDatasource(db.source_id)}
                            disabled={!!removingDb[db.source_id]}
                            className="px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors text-sm flex items-center gap-2"
                          >
                            <Trash2 size={16} />
                            {removingDb[db.source_id] ? 'Removing...' : 'Disconnect'}
                          </button>

                          {tables.length > 0 && (
                            <button
                              onClick={() => toggleExpanded(db.source_id)}
                              className="px-4 py-2 rounded-lg transition-colors text-sm flex items-center gap-2"
                              style={{ backgroundColor: 'var(--muted-bg)', color: 'var(--fg)' }}
                            >
                              {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                              {isExpanded ? 'Hide' : 'Show'} Tables
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Tables List */}
                      {isExpanded && tables.length > 0 && (
                        <div className="p-6" style={{ borderTop: '1px solid var(--border-color)', backgroundColor: 'var(--muted-bg)' }}>
                          <h4 className="font-semibold mb-3" style={{ color: 'var(--fg)' }}>Discovered Tables:</h4>
                          <div className="space-y-2 max-h-96 overflow-y-auto">
                            {tables.map((table, idx) => (
                              <div key={idx} className="flex justify-between items-center px-4 py-3 rounded" style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
                                <div>
                                  <span className="font-medium" style={{ color: 'var(--fg)' }}>{table.table_name}</span>
                                </div>
                                <div className="flex gap-6 text-sm" style={{ color: 'var(--muted-fg)' }}>
                                  <span>{table.row_count.toLocaleString()} rows</span>
                                  <span>{table.column_count} columns</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {activeTab === 'add' && (
          <div className="max-w-2xl">
            <h2 className="text-xl font-semibold mb-6" style={{ color: 'var(--fg)' }}>Add New Database</h2>
            
            <div className="rounded-lg p-6 mb-8" style={{ backgroundColor: 'rgba(0, 118, 76, 0.1)', border: '1px solid rgba(0, 118, 76, 0.2)' }}>
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2" style={{ color: 'var(--fg)' }}>
                <Zap size={16} className="text-yellow-500" /> Quick Setup
              </h3>
              <p className="text-sm mb-4" style={{ color: 'var(--muted-fg)' }}>
                Quickly add your DataSense database with pre-configured settings.
              </p>
              <button
                onClick={quickAddDataSense}
                style={{ backgroundColor: '#188e49' }}
                className="px-6 py-3 text-white rounded-lg hover:brightness-90 transition-colors font-medium"
              >
                Quick Add DataSense Database
              </button>
            </div>

            <div className="pt-8" style={{ borderTop: '1px solid var(--border-color)' }}>
              <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--fg)' }}>Custom Database Connection</h3>
              <p className="text-sm" style={{ color: 'var(--muted-fg)' }}>
                Custom database addition API coming in Week 2
              </p>
            </div>
          </div>
        )}

        {activeTab === 'status' && (
          <div className="max-w-2xl">
            <h2 className="text-xl font-semibold mb-6" style={{ color: 'var(--fg)' }}>Discovery History</h2>
            <div className="rounded-lg p-6 text-center" style={{ backgroundColor: 'rgba(0, 118, 76, 0.1)', border: '1px solid rgba(0, 118, 76, 0.2)' }}>
              <p className="flex items-center justify-center gap-2" style={{ color: 'var(--muted-fg)' }}>
                <BarChart2 size={16} className="inline-block" />
                Discovery history and status tracking coming soon in Week 2
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
