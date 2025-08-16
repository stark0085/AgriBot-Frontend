import React, { useState } from 'react';
import './App.css'
import Chats from './Components/ChatPage/Chats'
import Dashboard from './Components/Dashboard/Dashboard'
import './index.css'
import SignUp from './Components/LoginPage/SignUp'
import Language from './Components/LoginPage/language';
import LoginForm from './Components/LoginPage/login';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     {/* <Dashboard></Dashboard> */}
    {/* <Chats></Chats> */}
    {/* <SignUp></SignUp> */}
    <Language></Language>
    {/* <LoginForm></LoginForm> */}
    </>
  )
}

export default App