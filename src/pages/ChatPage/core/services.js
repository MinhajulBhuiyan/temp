import api from '../../../utils/api'

export async function listDatasources() {
  const res = await api.get('/datasource/list')
  return res.data
}

export async function listConversations(sourceId, limit = 20) {
  const res = await api.get(`/query/conversations/${sourceId}?limit=${limit}`)
  return res.data
}

export async function getConversation(conversationId) {
  const res = await api.get(`/query/conversation/${conversationId}`)
  return res.data
}

export async function deleteConversationService(conversationId) {
  const res = await api.delete(`/query/conversation/${conversationId}`)
  return res.data
}

export async function analyzeQuery(payload, options) {
  const res = await api.post('/query/analyze', payload, options)
  return res.data
}
