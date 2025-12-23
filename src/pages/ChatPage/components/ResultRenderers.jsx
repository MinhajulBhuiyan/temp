import { Table, BarChart3, AlertCircle } from 'lucide-react'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, LogarithmicScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { formatValue, formatCurrency, buildChartData } from '../core/utils'

ChartJS.register(CategoryScale, LinearScale, LogarithmicScale, BarElement, Title, Tooltip, Legend)

export function ChartView({ data, useLogScale, onToggleLogScale }) {
  const chartData = buildChartData(data)

  const allValues = data.results.flatMap(r => [r.y2023 || 0, r.y2024 || 0, r.y2025 || 0])
  const maxValue = Math.max(...allValues)
  const nonZeroValues = allValues.filter(v => v > 0)
  const minNonZeroValue = Math.min(...nonZeroValues)
  const hasLargeVariation = nonZeroValues.length > 0 && maxValue / (minNonZeroValue || 1) > 1000

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: useLogScale ? 'Revenue (Log Scale)' : 'Revenue' },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ${formatCurrency(context.parsed.y)}`
        }
      }
    },
    scales: {
      y: { type: useLogScale ? 'logarithmic' : 'linear', ticks: { callback: (value) => formatCurrency(value) } }
    }
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <BarChart3 size={16} style={{ color: 'var(--muted-fg)' }} />
        <span className="text-xs font-semibold uppercase" style={{ color: 'var(--muted-fg)' }}>Chart ({data.row_count} • {data.execution_time_ms}ms)</span>
      </div>

      {hasLargeVariation && !useLogScale && (
        <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="flex items-start gap-2">
            <AlertCircle size={16} className="text-amber-600 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-amber-800"><strong>Low values detected</strong></p>
              <button onClick={onToggleLogScale} className="mt-2 text-xs text-amber-700 underline">Log scale →</button>
            </div>
          </div>
        </div>
      )}

      {useLogScale && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center justify-between">
            <p className="text-sm text-blue-800">Log scale</p>
            <button onClick={onToggleLogScale} className="text-xs text-blue-700 underline">Normal →</button>
          </div>
        </div>
      )}

      <div className="h-80">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  )
}

export function TableView({ data }) {
  return (
    <>
      <div className="flex items-center gap-2 mb-3">
        <Table size={16} style={{ color: 'var(--muted-fg)' }} />
        <span className="text-xs font-semibold uppercase" style={{ color: 'var(--muted-fg)' }}>Results ({data.row_count} rows • {data.execution_time_ms}ms)</span>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              {data.columns.map((col, idx) => (
                <th key={idx} className="text-left py-2 px-3 font-semibold" style={{ color: 'var(--fg)' }}>{col.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.results.slice(0, 10).map((row, idx) => (
              <tr key={idx} className="hover:opacity-80" style={{ borderBottom: '1px solid var(--border-color)' }}>
                {data.columns.map((col, colIdx) => (
                  <td key={colIdx} className="py-2 px-3" style={{ color: 'var(--fg)' }}>{formatValue(row[col], col)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {data.row_count > 10 && <p className="text-xs mt-3" style={{ color: 'var(--muted-fg)' }}>Showing 10 of {data.row_count} rows</p>}
    </>
  )
}
