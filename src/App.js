import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar.js'
import HomePage from './components/HomePage.js'
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
            <Route path="movies" element={<h6>Movies</h6>} />
            <Route path="customers" element={<h6>Customers</h6>} />
            <Route path="reports" element={<h6>Reports</h6>} />
            <Route path="*" element={<h6>Something Else</h6>} />
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