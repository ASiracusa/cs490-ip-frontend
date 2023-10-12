import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar.js'
import HomePage from './components/HomePage.js'
import MoviesPage from './components/MoviesPage.js'
import CustomersPage from './components/CustomersPage.js'
import ReportsPage from './components/ReportsPage.js'
import { Box } from '@mui/material'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {

  const [backendData, setBackendData] = useState([{}]);
  
  useEffect(() => {
    console.log("[] USE EFFECT []");
    fetch("/api/hello").then(
      response => response.json()
    ).then(
      data => {
        setBackendData(data);
        console.log(data);
      }
    )
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/">
            <Route index element={<HomePage />} />
            <Route path="movies" element={<MoviesPage />} />
            <Route path="customers" element={<CustomersPage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="*" element={<i>Could not find the given page.</i>} />
          </Route>
        </Routes>
      </BrowserRouter>
      {/* <h3>{
        (typeof backendData.hello === 'undefined') ?
          "Loading..." : backendData.hello
      }</h3> */}
    </Box>
  )
}

export default App