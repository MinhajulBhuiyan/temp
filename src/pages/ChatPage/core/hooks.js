import { useState, useEffect, useRef } from 'react'
import * as services from './services'

export function useDatabases() {
  // const [databases, setDatabases] = useState()
  const [databases, setDatabases] = useState([]) // FIX: Initialize with an empty array
  const [selectedDb, setSelectedDb] = useState('')

  const fetchDatabases = async () => {
    try {
      const data = await services.listDatasources()
      setDatabases(data)
      if (data && data.length > 0 && !selectedDb) setSelectedDb(data[0].source_id)
    } catch (e) {
      console.error('Error fetching databases:', e)
    }
  }

  useEffect(() => {
    fetchDatabases()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { databases, selectedDb, setSelectedDb, fetchDatabases }
}

export function useConversations(selectedDb) {
  const [conversations, setConversations] = useState([])

  const fetchConversations = async () => {
    if (!selectedDb) return
    try {
      const res = await services.listConversations(selectedDb)
      if (res && res.success) setConversations(res.conversations)
    } catch (e) {
      console.error('Error fetching conversations:', e)
    }
  }

  useEffect(() => {
    fetchConversations()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDb])

  return { conversations, fetchConversations }
}

export function useChat() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingHistory, setLoadingHistory] = useState(false)
  const [abortController, setAbortController] = useState(null)
  const [currentConversationId, setCurrentConversationId] = useState(null)
  const abortRef = useRef(null)

  const startNewConversation = () => {
    setMessages([])
    setCurrentConversationId(null)
  }

  const loadConversation = async (conversationId) => {
    try {
      setLoadingHistory(true)
      setMessages([])
      setCurrentConversationId(conversationId)

      const res = await services.getConversation(conversationId)
      if (res && res.success) {
        const loaded = []
        for (const q of res.history) {
          loaded.push({ type: 'user', content: q.question, timestamp: new Date(q.created_at) })
          const hasResults = q.results && q.results.length > 0
          loaded.push({
            type: 'assistant',
            content: {
              success: q.success,
              question: q.question,
              sql: q.generated_sql,
              execution_time_ms: q.execution_time_ms,
              row_count: q.row_count,
              error: q.error_message,
              results: q.results || [],
              columns: q.columns || [],
              isHistorical: !hasResults,
              explanation: hasResults ? '💾 Stored results' : null
            },
            timestamp: new Date(q.created_at),
            useLogScale: false
          })
        }
        setMessages(loaded)
      }
    } catch (e) {
      console.error('Error loading conversation:', e)
    } finally {
      setLoadingHistory(false)
    }
  }

  const executeQuery = async (question, selectedDb, existingConversationId = currentConversationId) => {
    const userMessage = { type: 'user', content: question, timestamp: new Date() }
    setMessages(prev => [...prev, userMessage])
    setLoading(true)

    const controller = new AbortController()
    setAbortController(controller)
    abortRef.current = controller

    try {
      const res = await services.analyzeQuery({ question, source_id: selectedDb, conversation_id: existingConversationId }, { signal: controller.signal })
      if (!existingConversationId && res.conversation_id) setCurrentConversationId(res.conversation_id)
      const assistantMessage = { type: 'assistant', content: res, timestamp: new Date(), useLogScale: false }
      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      if (error.name === 'CanceledError' || error.message?.includes('cancel')) {
        setMessages(prev => [...prev, { type: 'error', content: '⏹️ Query execution stopped', timestamp: new Date() }])
      } else {
        setMessages(prev => [...prev, { type: 'error', content: error.response?.data?.detail || 'Failed to process query', timestamp: new Date() }])
      }
    } finally {
      setLoading(false)
      setAbortController(null)
      abortRef.current = null
    }
  }

  const stopExecution = () => {
    if (abortRef.current) {
      abortRef.current.abort()
      setLoading(false)
      setAbortController(null)
    }
  }

  const rerunQuery = (question, selectedDb) => {
    executeQuery(question, selectedDb, currentConversationId)
  }

  return {
    messages,
    setMessages,
    loading,
    loadingHistory,
    abortController,
    currentConversationId,
    setCurrentConversationId,
    startNewConversation,
    loadConversation,
    executeQuery,
    stopExecution,
    rerunQuery
  }
}
