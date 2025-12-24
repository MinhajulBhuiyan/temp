import React, { useState } from 'react'
import { Paperclip, SlidersHorizontal, Send } from 'lucide-react'
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

			{/* Content Area */}
			<div className="flex-1 overflow-y-auto flex items-center justify-center">
				<div className="w-full max-w-4xl px-8 relative z-10">
					<div className="relative">
						<div
							className="relative flex flex-col rounded-2xl prompt-box transition-all duration-200 border"
							style={{ 
								backgroundColor: 'var(--prompt-bg)', 
								borderColor: '#188e49',
								boxShadow: '0 8px 24px rgba(24, 142, 73, 0.08)'
							}}
						>
								<div className="overflow-y-auto" style={{ maxHeight: '200px' }}>
									<textarea
										rows="1"
										value={input}
										onChange={(e) => setInput(e.target.value)}
										style={{ 
											overflow: 'auto',
											height: 'auto',
											minHeight: '52px',
											fontSize: '15px',
											lineHeight: '1.6'
										}}
										onInput={(e) => {
											e.target.style.height = 'auto'
											e.target.style.height = e.target.scrollHeight + 'px'
										}}
										className="w-full px-5 py-4 resize-none bg-transparent border-none focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 align-top"
										placeholder="Ask me anything..."
									spellCheck="false"
								/>
							</div>
							<div className="h-16 mt-2">
								<div className="absolute left-5 right-5 bottom-3.5 flex items-center justify-between">
									<div className="flex items-center gap-2">
										<button
										className="p-2.5 transition-all duration-200 rounded-lg cursor-pointer border border-transparent"
										style={{ 
											color: 'var(--muted-fg)', 
											backgroundColor: 'transparent'
										}}
										onMouseEnter={(e) => {
											e.currentTarget.style.color = '#188e49'
											e.currentTarget.style.borderColor = '#188e49'
										}}
										onMouseLeave={(e) => {
											e.currentTarget.style.color = 'var(--muted-fg)'
											e.currentTarget.style.borderColor = 'transparent'
										}}
										aria-label="Attach file"
										type="button"
									>
										<Paperclip className="w-[18px] h-[18px]" />
										</button>
										<button
										className="p-2.5 transition-all duration-200 rounded-lg cursor-pointer border border-transparent"
										style={{ 
											color: 'var(--muted-fg)', 
											backgroundColor: 'transparent'
										}}
										onMouseEnter={(e) => {
											e.currentTarget.style.color = '#188e49'
											e.currentTarget.style.borderColor = '#188e49'
										}}
										onMouseLeave={(e) => {
											e.currentTarget.style.color = 'var(--muted-fg)'
											e.currentTarget.style.borderColor = 'transparent'
										}}
										aria-label="Tools"
										type="button"
									>
									<SlidersHorizontal className="w-[18px] h-[18px]" />
										</button>
									</div>
									<button
										className="send-button"
										aria-label="Send"
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