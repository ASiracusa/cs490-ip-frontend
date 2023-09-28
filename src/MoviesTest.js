import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar.js'
import HomePage from './components/HomePage.js'
import MoviesPage from './components/MoviesPage.js'
import CustomersPage from './components/CustomersPage.js'
import { Box, Typography } from '@mui/material'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {

  const [filmName, setFilmName] = useState("");
  const [actorName, setActorName] = useState("");
  const [filmGenre, setFilmGenre] = useState("");
  const [searchedMovies, setSearchedMovies] = useState();
  
  useEffect(() => {
    
    fetch("/api/searchMovies?filmName=" + "soup" + "&actorName=" + "" + "&filmGenre=" + "").then(
      response => response.json()
    ).then(
      data => {
        setSearchedMovies(data);
        console.log("TEST 1 - Part of a film name that multiple movies share.")
        console.log(data);
        if (data.length === 2 && data[0].film_id === 645 && data[1].film_id === 822) {
          console.log("Test passed.");
        } else {
          console.log("Test FAILED.");
        }
      }
    )

    fetch("/api/searchMovies?filmName=" + "harry idaho" + "&actorName=" + "matthew carrey" + "&filmGenre=" + "drama").then(
      response => response.json()
    ).then(
      data => {
        setSearchedMovies(data);
        console.log("TEST 2 - Specifying all three parameters.")
        console.log(data);
        if (data.length === 1 && data[0].film_id === 403) {
          console.log("Test passed.");
        } else {
          console.log("Test FAILED.");
        }
      }
    )
    
    fetch("/api/searchMovies?filmName=" + "soups" + "&actorName=" + "" + "&filmGenre=" + "").then(
      response => response.json()
    ).then(
      data => {
        setSearchedMovies(data);
        console.log("TEST 3 - Using a film name parameter that no movies contain.")
        console.log(data);
        if (data.length === 0) {
          console.log("Test passed.");
        } else {
          console.log("Test FAILED.");
        }
      }
    )
    
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography>Open the console to see the test results.</Typography>
    </Box>
  )
}

export default App