import { Code, AlertCircle, RefreshCw } from 'lucide-react'
import { isChartData } from '../core/utils'
import { ChartView, TableView } from './ResultRenderers'

export function MessageList({ messages, showSQL, onToggleLogScale, onRerun }) {
  return (
    <>
      {messages.map((message, idx) => (
        <MessageBubble 
          key={idx} 
          message={message} 
          messageIndex={idx} 
          showSQL={showSQL} 
          onToggleLogScale={() => onToggleLogScale(idx)} 
          onRerun={onRerun} 
        />
      ))}
    </>
  )
}

export function MessageBubble({ message, messageIndex, showSQL, onToggleLogScale, onRerun }) {
  if (message.type === 'user') {
    return (
      <div className="flex justify-end">
        <div style={{ backgroundColor: '#00764c' }} className="text-white px-4 py-2 rounded-2xl rounded-tr-sm max-w-2xl text-sm">
          {message.content}
        </div>
      </div>
    )
  }

  if (message.type === 'error') {
    return (
      <div className="flex justify-start">
        <div className="bg-red-50 text-red-700 px-4 py-2 rounded-2xl rounded-tl-sm max-w-2xl text-sm border border-red-200">
          {message.content}
        </div>
      </div>
    )
  }

  // Assistant message with data
  const data = message.content

  return (
    <div className="flex justify-start">
      <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-sm max-w-4xl w-full shadow-sm">
        <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
          <p className="text-sm text-gray-600 font-medium">📊 {data.question}</p>
          <button 
            onClick={() => onRerun(data.question)} 
            className="text-gray-400 hover:text-[#00764c] transition-colors" 
            title="Re-run"
          >
            <RefreshCw size={16} />
          </button>
        </div>

        {showSQL && data.sql && (
          <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
            <div className="flex items-center gap-2 mb-1">
              <Code size={16} className="text-gray-600" />
              <span className="text-xs font-semibold text-gray-600 uppercase">SQL</span>
              {data.explanation && (
                <span className="text-xs text-gray-500 ml-auto">{data.explanation}</span>
              )}
            </div>
            <pre className="text-xs text-gray-700 font-mono bg-white p-3 rounded border border-gray-200 overflow-x-auto">
              {data.sql}
            </pre>
          </div>
        )}

        {data.success && data.results && data.results.length > 0 ? (
          <div className="px-4 py-3">
            {isChartData(data) ? (
              <ChartView 
                data={data} 
                useLogScale={message.useLogScale || false} 
                onToggleLogScale={onToggleLogScale} 
              />
            ) : (
              <TableView data={data} />
            )}
          </div>
        ) : data.success && data.isHistorical ? (
          <div className="px-4 py-3">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <AlertCircle size={16} className="text-[#00764c]" />
              <span>No stored results ({data.execution_time_ms}ms, {data.row_count} rows)</span>
              <button 
                onClick={() => onRerun(data.question)} 
                className="ml-auto text-xs text-[#00764c] hover:text-[#005a3e] underline"
              >
                Re-run to see data →
              </button>
            </div>
          </div>
        ) : data.error ? (
          <div className="px-3 py-3 text-red-600 text-sm">{data.error}</div>
        ) : null}
      </div>
    </div>
  )
}
