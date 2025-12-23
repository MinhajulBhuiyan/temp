import React, { useState, useRef, useEffect } from 'react'
import { Database } from 'lucide-react'
import { Header, LoadingIndicator, InputBar } from './ChatPage/components/ChatComponents'
import { MessageList } from './ChatPage/components/MessageDisplay'
import { useDatabases, useChat } from './ChatPage/core/hooks'

export default function ChatPageContainer() {
	const { databases, selectedDb, setSelectedDb } = useDatabases()
	const chat = useChat()

	// load pending conversation id set by sidebar quick-open
	useEffect(() => {
		const pending = localStorage.getItem('openConversationId')
		if (pending) {
			try {
				chat.loadConversation(pending)
			} catch (e) {
				console.error('Error loading pending conversation', e)
			}
			localStorage.removeItem('openConversationId')
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const [input, setInput] = useState('')
	const [showSQL, setShowSQL] = useState(true)
	const messagesEndRef = useRef(null)

	useEffect(() => {
		if (chat.messages.length) messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
	}, [chat.messages])

	// previously fetched conversations for right sidebar; removed as sidebar was moved to left

	const handleSubmit = async (e) => {
		e?.preventDefault()
		if (!input.trim() || !selectedDb) return
		await chat.executeQuery(input.trim(), selectedDb)
		setInput('')
	}

	const handleSuggestionClick = (suggestion) => {
		if (!selectedDb) return
		setInput(suggestion)
		chat.executeQuery(suggestion, selectedDb)
	}

	const suggestionQueries = [
		"How many products do we have?",
		"Show me top 5 products by revenue",
		"Show me revenue by region",
		"Compare sales of Feb, Mar, Apr for last 2 years"
	]

	return (
		<div className="h-full flex" style={{ backgroundColor: 'var(--muted-bg)' }}>
			<div className="flex-1 flex flex-col">
				<Header 
					showSQL={showSQL} 
					toggleShowSQL={() => setShowSQL(s => !s)} 
					databases={databases} 
					selectedDb={selectedDb} 
					onSelectDb={setSelectedDb} 
					onNew={chat.startNewConversation} 
				/>

				<div className="flex-1 overflow-y-auto px-6 py-4">
					<div className="max-w-5xl mx-auto space-y-4">
						{chat.loadingHistory && (
						<div className="flex items-center justify-center gap-2 py-8" style={{ color: 'var(--muted-fg)' }}>
							<LoadingIndicator loading={true} />
						</div>
					)}

					{!chat.loadingHistory && chat.messages.length === 0 && (
						<div className="flex flex-col items-center justify-center py-12">
							<div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6" style={{ backgroundColor: 'rgba(0, 118, 76, 0.1)' }}>
								<Database size={40} style={{ color: '#00764c' }} />
							</div>
							<h2 className="text-2xl font-semibold mb-3" style={{ color: 'var(--fg)' }}>Start a conversation</h2>
							<p className="mb-10" style={{ color: 'var(--muted-fg)' }}>Ask me anything about your data</p>
							
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl">
								{suggestionQueries.map((query, idx) => (
									<button
										key={idx}
										onClick={() => handleSuggestionClick(query)}
										disabled={!selectedDb}
										className="px-6 py-4 rounded-lg text-left hover:shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
										style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)' }}
									>
										<p className="text-sm font-medium" style={{ color: 'var(--fg)' }}>{query}</p>
									</button>
								))}
							</div>
						</div>
					)}

						{!chat.loadingHistory && (
							<MessageList 
								messages={chat.messages} 
								showSQL={showSQL} 
								onToggleLogScale={(idx) => chat.setMessages(prev => prev.map((m,i)=> i===idx?{...m, useLogScale: !m.useLogScale}:m ))} 
								onRerun={(q) => chat.rerunQuery(q, selectedDb)} 
							/>
						)}

						{chat.loading && <LoadingIndicator loading={true} onStop={chat.stopExecution} />}

						<div ref={messagesEndRef} />
					</div>
				</div>

				<InputBar 
					input={input} 
					setInput={setInput} 
					onSubmit={handleSubmit} 
					disabled={chat.loading || !selectedDb} 
					loading={chat.loading} 
				/>
			</div>
		</div>
	)
}

