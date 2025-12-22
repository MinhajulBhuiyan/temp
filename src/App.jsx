import { useState } from 'react'
import Sidebar from './components/Sidebar'
import ChatPage from './pages/ChatPage'
import DiscoveryPage from './pages/DiscoveryPage'
import SettingsPage from './pages/SettingsPage'
import './index.css'

function App() {
  const [currentPage, setCurrentPage] = useState('chat')

  const renderPage = () => {
    switch (currentPage) {
      case 'chat':
        return <ChatPage />
      case 'discovery':
        return <DiscoveryPage />
      case 'settings':
        return <SettingsPage />
      default:
        return <ChatPage />
    }
  }

  return (
    <div className="flex h-screen bg-white">
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="flex-1 overflow-hidden">
        {renderPage()}
      </main>
    </div>
  )
}

export default App
