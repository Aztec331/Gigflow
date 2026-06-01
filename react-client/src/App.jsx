import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthPage from './components/AuthPage'
import MainPage from './components/MainPage'
import Rough from './components/Rough'

function App() {
  return (

    <div className='min-h-screen bg-slate-950'>
    <BrowserRouter>

      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/rough" element={<Rough />} />
      </Routes>

    </BrowserRouter>
    </div>


  )
}

export default App