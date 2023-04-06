import Navigation from 'components/Navigation';
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Auth from 'routes/Auth';
import Home from 'routes/Home';
import Profiles from 'routes/Profiles';

function AppRouter({isLoggedIn, userObj}) {


  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
    {isLoggedIn &&   <Navigation userObj={userObj}/>} 
    {/* &연산자 - true일 경우에만 실행 */}
      <Routes>
        {isLoggedIn ? ( 
        <>
        <Route path='/' element ={<Home userObj={userObj}/>} />
        <Route path='/profile' element={<Profiles userObj={userObj} />} />
        </>  
        ) : (
          <Route path='/' element ={<Auth />} />
        )}
             
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter