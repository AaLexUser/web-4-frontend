import React from 'react'
import { Button } from 'react-toolbox/lib/button'
import Navbar from './Navbar'
import WelcomePage from './pages/WelcomePage'
import SignUpPage from './pages/SignUpPage/SignUpPage'
import MainLayout from './Layout.jsx'
import NotFoundPage from './pages/NotFoundPage'
import {Route, Routes, Link } from 'react-router-dom'
import MainPage from './pages/MainPage'

export const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<MainLayout/>}>
          <Route index element={<WelcomePage/>}/>
          <Route path="sign-up" element={<SignUpPage/>}/>
          <Route path='main' element={<MainPage/>}/>
          <Route path="*" element={<NotFoundPage/>}/>
        </Route>
      </Routes>
    </div>
  )
}
