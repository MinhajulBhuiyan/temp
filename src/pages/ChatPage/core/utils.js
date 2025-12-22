export function formatValue(value, columnName) {
  if (value === null || value === undefined) return '-'

  const col = (columnName || '').toLowerCase()

  if (col.includes('revenue') || col.includes('sales') || col.includes('total') || col.includes('amount') || col.includes('value')) {
    return formatCurrency(value)
  }

  if (col.includes('count') || col.includes('invoice')) {
    return Number(value).toLocaleString()
  }

  if (typeof value === 'number') {
    return value > 1000 ? value.toLocaleString() : value.toFixed(2)
  }

  return value
}

export function formatCurrency(value) {
  if (value === null || value === undefined || value === 0) return '-'

  const num = Number(value)

  if (num >= 1000000000) return `${(num / 1000000000).toFixed(2)}B BDT`
  if (num >= 1000000) return `${(num / 1000000).toFixed(2)}M BDT`
  if (num >= 1000) return `${(num / 1000).toFixed(2)}K BDT`

  return `${num.toFixed(2)} BDT`
}

export function isChartData(data) {
  if (!data || !data.columns || data.columns.length === 0) return false
  return data.columns.includes('y2023') || data.columns.includes('y2024') || data.columns.includes('y2025')
}

export function buildChartData(data) {
  const labels = data.results.map(r => r.month_name || r.fiscal_month)
  const datasets = [
    { label: '2023', data: data.results.map(r => r.y2023 || 0), backgroundColor: 'rgba(59, 130, 246, 0.8)' },
    { label: '2024', data: data.results.map(r => r.y2024 || 0), backgroundColor: 'rgba(16, 185, 129, 0.8)' },
    { label: '2025', data: data.results.map(r => r.y2025 || 0), backgroundColor: 'rgba(245, 158, 11, 0.8)' },
  ]
  return { labels, datasets }
}
