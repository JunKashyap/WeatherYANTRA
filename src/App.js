import React from 'react'
import { Route, Routes } from "react-router-dom";
import Homepage from './Homepage';
import LocateUser from './LocateUser';
import NotFound from './NotFound';
import './App.css'
function App() {
  return (
    <>
      <div className='app'>
        <Routes>
          <Route path="/" element={<LocateUser/>} />
          <Route path="/homepage" element={<Homepage/>} />
          <Route path="/Notfound" element={<NotFound/>} />
        </Routes>
      </div>
    </>
  )
}

export default App