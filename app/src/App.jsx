import { useState } from 'react'
import './App.css'
import DarkMode from './components/DarkMode'
import Header from './'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <DarkMode/>
    <Header/>
    </>
  )
}

export default App
