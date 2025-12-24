import React, { useState } from 'react'
import { Paperclip, Mic, Send } from 'lucide-react'
import { Header } from './ChatPage/components/ChatComponents'
import { useChat } from './ChatPage/core/hooks'

export default function ChatPageContainer() {
	const chat = useChat()
	const [showSQL, setShowSQL] = useState(true)
	const [input, setInput] = useState('')

	return (
		<div className="h-full flex flex-col">
			<Header 
				showSQL={showSQL} 
				toggleShowSQL={() => setShowSQL(s => !s)} 
				databases={[]} 
				selectedDb={null} 
				onSelectDb={() => {}} 
				onNew={chat.startNewConversation} 
			/>

			{/* Content Area with Pattern */}
			<div className="flex-1 overflow-y-auto circuit-pattern flex items-center justify-center">
				<div className="w-full max-w-5xl px-8 relative z-10">
					<div className="relative">
						<div
							className="relative flex flex-col rounded-xl prompt-box"
							style={{ 
								backgroundColor: 'var(--prompt-bg)', 
								border: '2px solid #188e49'
							}}
						>
							<div className="overflow-y-auto" style={{ maxHeight: '180px' }}>
								<textarea
									rows="1"
									value={input}
									onChange={(e) => setInput(e.target.value)}
									style={{ 
										overflow: 'auto',
										height: 'auto',
										minHeight: '48px'
									}}
									onInput={(e) => {
										e.target.style.height = 'auto'
										e.target.style.height = e.target.scrollHeight + 'px'
									}}
									className="w-full px-4 py-3 resize-none bg-transparent border-none focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 align-top leading-normal"
									placeholder="Ask me anything..."
									spellCheck="false"
								/>
							</div>
							<div className="h-16 mt-3">
								<div className="absolute left-4 right-4 bottom-4 flex items-center justify-between">
									<div className="flex items-center gap-3">
										<button
											className="p-2 transition-colors rounded-lg cursor-pointer"
											style={{ 
												color: 'var(--muted-fg)', 
												border: '1px solid var(--border-color)' 
											}}
											onMouseEnter={(e) => {
												e.currentTarget.style.color = '#188e49'
												e.currentTarget.style.borderColor = '#188e49'
											}}
											onMouseLeave={(e) => {
												e.currentTarget.style.color = 'var(--muted-fg)'
												e.currentTarget.style.borderColor = 'var(--border-color)'
											}}
											aria-label="Attach file"
											type="button"
										>
											<Paperclip className="w-4 h-4" />
										</button>
										<button
											className="p-2 transition-colors rounded-lg cursor-pointer"
											style={{ 
												color: 'var(--muted-fg)', 
												border: '1px solid var(--border-color)' 
											}}
											onMouseEnter={(e) => {
												e.currentTarget.style.color = '#188e49'
												e.currentTarget.style.borderColor = '#188e49'
											}}
											onMouseLeave={(e) => {
												e.currentTarget.style.color = 'var(--muted-fg)'
												e.currentTarget.style.borderColor = 'var(--border-color)'
											}}
											aria-label="Voice input"
											type="button"
										>
											<Mic className="w-4 h-4" />
										</button>
									</div>
									<button
										className="send-button"
										aria-label="Send message"
										type="button"
									>
										<div className="svg-wrapper">
											<Send />
										</div>
										<span>Send</span>
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}