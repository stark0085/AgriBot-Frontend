import React, { useState } from 'react';
import './App.css'
import Chats from './Components/ChatPage/Chats'
import Dashboard from './Components/Dashboard/Dashboard'
import './index.css'
import SignUp from './Components/LoginPage/signup'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    {/* <Dashboard></Dashboard> */}
    <Chats></Chats>
    </>
  )
}

export default App