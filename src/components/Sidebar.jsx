import React, { useEffect, useState } from 'react'
import { MessageSquare, Database, Settings, Trash2, Menu, PanelLeftClose, PanelRightClose } from 'lucide-react'
import * as services from '../pages/ChatPage/core/services'

function RecentConversations({ onOpen, collapsed }) {
  const [convs, setConvs] = useState([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    try {
      const datas = await services.listDatasources()
      if (datas && datas.length > 0) {
        const src = datas[0].source_id
        const res = await services.listConversations(src, 50)
        if (res && res.success) setConvs(res.conversations || [])
      }
    } catch (e) {
      console.error('RecentConversations load error', e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (collapsed) return null

  if (loading) return (
    <div className="px-4 py-3 border-b" style={{ borderColor: 'var(--border-color)' }}>
      <div className="text-sm" style={{ color: 'var(--muted-fg)' }}>Loading recent...</div>
    </div>
  )

  if (!convs || convs.length === 0) return null

  return (
    <div className="flex flex-col h-full">
      {/* fixed header */}
      <div className="px-3 py-2 flex-none">
        <div className="flex items-center gap-2">
          <MessageSquare size={18} style={{ color: 'var(--muted-fg)' }} />
          <h3 className="font-semibold" style={{ color: 'var(--fg)' }}>Recent Conversations</h3>
        </div>
      </div>

      {/* scrollable list */}
      <div className="flex-1 overflow-y-auto p-3 pb-4 space-y-2">
        {convs.map((conv) => (
          <div key={conv.conversation_id} className="relative group px-3 py-2 rounded-lg border transition-colors cursor-pointer hover:opacity-80" style={{ backgroundColor: 'var(--muted-bg)', borderColor: 'var(--border-color)' }}>
            <button
              onClick={() => { localStorage.setItem('openConversationId', conv.conversation_id); onOpen && onOpen(conv.conversation_id) }}
              className="w-full text-left"
            >
              <p className="text-sm font-medium line-clamp-2 pr-8" style={{ color: 'var(--fg)' }}>{conv.title || 'Untitled'}</p>
              <div className="flex items-center justify-between mt-1 text-xs" style={{ color: 'var(--muted-fg)' }}>
                <span>{conv.query_count} queries</span>
                <span>{new Date(conv.updated_at).toLocaleDateString()}</span>
              </div>
            </button>

            <button
              onClick={async (e) => {
                e.stopPropagation()
                if (!confirm('Delete this conversation?')) return
                try {
                  await services.deleteConversationService(conv.conversation_id)
                  await load()
                } catch (err) {
                  console.error('Failed to delete conversation', err)
                }
              }}
              className="absolute top-2 right-2 p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded opacity-0 group-hover:opacity-100 transition-opacity"
              title="Delete"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Sidebar({ currentPage, onNavigate }) {
  const [collapsed, setCollapsed] = useState(() => {
    try {
      return localStorage.getItem('sidebarCollapsed') === '1'
    } catch (e) {
      return false
    }
  })

  useEffect(() => {
    try { localStorage.setItem('sidebarCollapsed', collapsed ? '1' : '0') } catch (e) {}
  }, [collapsed])
  const navItems = [
    { id: 'chat', icon: MessageSquare, label: 'AI Chat Assistant' },
    { id: 'discovery', icon: Database, label: 'Database Discovery' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ]

  return (
    <div className={`${collapsed ? 'w-14' : 'w-64'} h-screen flex flex-col transition-all duration-200 shadow-sm`} style={{ backgroundColor: 'var(--muted-bg)', borderRight: '1px solid var(--border-color)' }}>
      {/* Logo / collapsed icon */}
      <div className={`flex items-center justify-between shadow-sm ${collapsed ? 'justify-center' : 'px-3'}`} style={{ height: '72px', borderBottom: '1px solid var(--border-color)', backgroundColor: 'var(--card-bg)' }}>
        {collapsed ? (
          // When collapsed: show logo with expand icon on hover
          <button
            onClick={(e) => {
              setCollapsed(false)
              try { if (e?.nativeEvent?.detail > 0) e.currentTarget.blur() } catch (err) {}
            }}
            className="relative w-full h-full flex items-center justify-center group transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
            title="Expand sidebar"
          >
            <img
              src="/logo.png"
              alt="DataSense"
              className="w-10 h-10 object-contain group-hover:opacity-0 transition-opacity"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#188e49] text-white">
                <PanelRightClose size={20} />
              </div>
            </div>
          </button>
        ) : (
          <>
            <img
              src="/logo.png"
              alt="DataSense"
              className="w-12 h-12 object-contain ml-2"
            />

            {/* collapse toggle to the right of the logo */}
            <button
              onClick={(e) => {
                setCollapsed(true)
                try { if (e?.nativeEvent?.detail > 0) e.currentTarget.blur() } catch (err) {}
              }}
              className="ml-auto w-9 h-9 rounded-lg transition-colors flex items-center justify-center hover:bg-[#188e49] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
              title="Collapse sidebar"
              aria-pressed={collapsed}
            >
              <PanelLeftClose size={20} />
            </button>
          </>
        )}
      </div>

      {/* main area (conversations) - fills available vertical space */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <RecentConversations collapsed={collapsed} onOpen={() => onNavigate('chat')} />
      </div>

      {/* small spacer to separate recent conversations from bottom nav */}
      <div className={`${collapsed ? 'h-4' : 'h-0'} flex-none`} aria-hidden="true" />

      <nav className="p-2 flex-none sticky bottom-0" style={{ backgroundColor: 'var(--muted-bg)', borderTop: '1px solid var(--border-color)' }}>
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = currentPage === item.id

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              title={item.label}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-md text-sm transition-colors mb-0.5 ${collapsed ? 'justify-center' : ''}`}
              style={{
                backgroundColor: isActive ? 'rgba(0, 118, 76, 0.1)' : 'transparent',
                color: isActive ? '#188e49' : 'var(--fg)',
                fontWeight: isActive ? 500 : 400
              }}
            >
              <span className={`${collapsed ? '' : 'w-6'} flex-shrink-0 flex items-center justify-center`}>
                <Icon size={18} />
              </span>
              <span className={`${collapsed ? 'hidden' : 'block'} truncate`}>{item.label}</span>
            </button>
          )
        })}
      </nav>
    </div>
  )
}