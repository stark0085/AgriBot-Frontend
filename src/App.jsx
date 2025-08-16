import React, { useState } from 'react';
import './App.css'
import Chats from './Components/ChatPage/Chats'
import Dashboard from './Components/Dashboard/Dashboard'
import './index.css'
import SignUp from './Components/LoginPage/signup'
import ProfilePage from './Components/Profile/Profile';


function App() {
  return (
    <>
      {/* <Dashboard></Dashboard> */}
      {/* <Chats></Chats> */}
      {/* <SignUp></SignUp>  */}
      <ProfilePage></ProfilePage>
    </>
  )
}

export default App