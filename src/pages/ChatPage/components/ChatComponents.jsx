import { Send, Loader2, Database, MessageSquare, Plus, StopCircle, Eye, EyeOff, Trash2, ArrowRight } from 'lucide-react'

export function Header({ showSQL, toggleShowSQL, databases, selectedDb, onSelectDb, onNew }) {
  return (
    <div className="bg-white border-b border-gray-200 px-6 flex items-center" style={{ height: '72px' }}>
      <div className="flex items-center justify-between w-full">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">DataSense</h1>
          <p className="text-sm text-gray-500 mt-1">Making Sense of Data</p>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={toggleShowSQL} className="px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg flex items-center gap-2">
            {showSQL ? <Eye size={16} /> : <EyeOff size={16} />}
            <span className="text-xs">{showSQL ? 'Hide' : 'Show'} SQL</span>
          </button>

          {/* {databases.length > 0 && ( */}
          {Array.isArray(databases) && databases.length > 0 && (
            <div className="flex items-center gap-2">
              <Database size={18} className="text-gray-400" />
              <select value={selectedDb} onChange={(e) => onSelectDb(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00764c]">
                {databases.map(db => (
                  <option key={db.source_id} value={db.source_id}>{db.name}</option>
                ))}
              </select>
            </div>
          )}

          <button onClick={onNew} className="px-4 py-2 text-white rounded-lg transition-colors flex items-center gap-2 text-sm" style={{ backgroundColor: '#00764c' }}>
            <Plus size={16} />
            New Chat
          </button>
        </div>
      </div>
    </div>
  )
}

export function ConversationSidebar({ conversations, currentConversationId, onLoad, onDelete }) {
  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
      <div className="px-4 py-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <MessageSquare size={18} className="text-gray-600" />
          <h3 className="font-semibold text-gray-900">Conversations</h3>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {conversations.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-8">No conversations yet</p>
        ) : (
          <div className="space-y-2">
            {conversations.map((conv) => (
              <div key={conv.conversation_id} className={`relative group px-3 py-3 rounded-lg border transition-colors cursor-pointer ${currentConversationId === conv.conversation_id ? 'bg-blue-50 border-blue-300' : 'bg-gray-50 border-gray-200 hover:bg-blue-50 hover:border-blue-300'}`}>
                <button onClick={() => onLoad(conv.conversation_id)} className="w-full text-left">
                  <p className="text-sm text-gray-900 font-medium line-clamp-2 pr-8">{conv.title}</p>
                  <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                    <span>{conv.query_count} queries</span>
                    <span>{new Date(conv.updated_at).toLocaleDateString()}</span>
                  </div>
                </button>

                <button onClick={(e) => onDelete(conv.conversation_id, e)} className="absolute top-2 right-2 p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded opacity-0 group-hover:opacity-100 transition-opacity" title="Delete">
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export function LoadingIndicator({ loading, onStop }) {
  if (!loading) return null
  return (
    <div className="flex items-center gap-3 text-gray-500">
      <Loader2 size={20} className="animate-spin" />
      <span className="text-sm">Analyzing...</span>
      <button onClick={onStop} className="ml-auto px-3 py-1.5 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 flex items-center gap-2 text-sm">
        <StopCircle size={16} />
        Stop
      </button>
    </div>
  )
}

export function InputBar({ input, setInput, onSubmit, disabled, loading }) {
  return (
    <div className="px-6 pb-6 pt-2">
      <div className="max-w-5xl mx-auto">
        <form onSubmit={onSubmit} className="relative">
          <input 
            type="text" 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            placeholder="Ask a question..." 
            disabled={disabled} 
            className="w-full pl-6 pr-16 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#00764c] disabled:bg-gray-100" 
          />
          <button 
            type="submit" 
            disabled={loading || !input.trim() || disabled} 
            className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 text-white rounded-full disabled:opacity-50 transition-colors flex items-center justify-center"
            style={{ backgroundColor: '#00764c' }}
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : <ArrowRight size={18} />}
          </button>
        </form>
      </div>
    </div>
  )
}
