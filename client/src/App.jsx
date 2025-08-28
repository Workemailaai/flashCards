import { Route, Routes } from 'react-router'
import './App.css'
import Layout from './app/Layout'
import HomePage from './pages/home/HomePage'
import DeckPage from './pages/Deck/DeckPage'

function App() {
  
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>        
          <Route index element={<HomePage />} />
          <Route path='decks' element={<DeckPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
