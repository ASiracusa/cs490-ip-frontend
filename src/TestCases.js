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
        console.log("TEST 1A (Feature 5) - Part of a film name that multiple movies share ('soup').")
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
        console.log("TEST 1B (Feature 5) - Specifying all three parameters.")
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
        console.log("TEST 1C (Feature 5) - Using a film name parameter that no movies contain ('soups').")
        console.log(data);
        if (data.length === 0) {
          console.log("Test passed.");
        } else {
          console.log("Test FAILED.");
        }
      }
    )

    fetch("/api/searchCustomers?customerId=" + "" + "&firstName=" + "ana" + "&lastName=" + "").then(
      response => response.json()
    ).then(
      data => {
        console.log("TEST 2A (Feature 9) - Part of a customer name that multiple customers share ('ana').")
        console.log(data);
        if (data.length === 3 && data[0].customer_id === 181 && data[1].customer_id === 179 && data[2].customer_id === 96) {
          console.log("Test passed.");
        } else {
          console.log("Test FAILED.");
        }
      }
    )

    fetch("/api/searchCustomers?customerId=" + "51" + "&firstName=" + "alice" + "&lastName=" + "stewart").then(
      response => response.json()
    ).then(
      data => {
        console.log("TEST 2B (Feature 9) - Specifying all three parameters.")
        console.log(data);
        if (data.length === 1 && data[0].customer_id === 51) {
          console.log("Test passed.");
        } else {
          console.log("Test FAILED.");
        }
      }
    )

    fetch("/api/searchCustomers?customerId=" + "" + "&firstName=" + "grant" + "&lastName=" + "").then(
      response => response.json()
    ).then(
      data => {
        console.log("TEST 2C (Feature 9) - Using a customer name parameter that no names contain ('Grant').")
        console.log(data);
        if (data.length === 0) {
          console.log("Test passed.");
        } else {
          console.log("Test FAILED.");
        }
      }
    )

    fetch("/api/addAddress?address=" + "123 Main St" + "&cityId=" + "1").then(
      response => response.json()
    ).then(
      data => {
        console.log("TEST 3A (Feature 10) - Creating a new city.")
        console.log(data);
        if (data.affectedRows === 1) {
          console.log("Test passed.");
        } else {
          console.log("Test FAILED.");
        }
      }
    )

    fetch("/api/addCity?city=" + "Newark" + "&countryId=" + "103").then(
      response => response.json()
    ).then(
      data => {
        console.log("TEST 3B (Feature 10) - Creating a new address.")
        console.log(data);
        if (data.affectedRows === 1) {
          console.log("Test passed.");
        } else {
          console.log("Test FAILED.");
        }
      }
    )

    fetch("/api/addCustomer?firstName=" + "Anthony" + "&lastName=" + "Siracusa" + "&active=" + "1" + "&email=" + "anthony.siracusa@sakila.com" + "&storeId=" + "1" + "&addressId=" + "1").then(
      response => response.json()
    ).then(
      data => {
        console.log("TEST 3C (Feature 10) - Creating the customer itself.")
        console.log(data);
        if (data.affectedRows === 1) {
          console.log("Test passed.");
        } else {
          console.log("Test FAILED.");
        }
      }
    )

    fetch("/api/getCountry?country=" + "United States").then(
      response => response.json()
    ).then(
      data => {
        console.log("TEST 4A (Feature 11) - Getting an existing country's ID.")
        console.log(data);
        if (data[0].country_id === 103) {
          console.log("Test passed.");
        } else {
          console.log("Test FAILED.");
        }
      }
    )

    fetch("/api/getCity?city=" + "Dallas" + "&countryId=" + "103").then(
      response => response.json()
    ).then(
      data => {
        console.log("TEST 4B (Feature 11) - Getting an existing city's ID.")
        console.log(data);
        if (data[0].city_id === 135) {
          console.log("Test passed.");
        } else {
          console.log("Test FAILED.");
        }
      }
    )

    fetch("/api/updateCustomerDetails?customerId=" + "147" + "&firstName=" + "JOANN" + "&lastName=" + "ROBERTSON" + "&active=" + "1" + "&email=" + "joanne.robertson@sakila.com" + "&storeId=" + "1").then(
      response => response.json()
    ).then(
      data => {
        console.log("TEST 4C (Feature 11) - Editing the customer itself.")
        console.log(data);
        if (data.affectedRows === 1) {
          console.log("Test passed.");
        } else {
          console.log("Test FAILED.");
        }
      }
    )

    fetch("/api/verifyCustomer?customerId=" + "100").then(
      response => response.json()
    ).then(
      data => {
        console.log("TEST 5A (Feature 7) - Getting a valid customer's ID.")
        console.log(data);
        if (data.length === 1 && data[0].first_name === 'ROBIN' && data[0].last_name === 'HAYES') {
          console.log("Test passed.");
        } else {
          console.log("Test FAILED.");
        }
      }
    )

    fetch("/api/verifyCustomer?customerId=" + "700").then(
      response => response.json()
    ).then(
      data => {
        console.log("TEST 5B (Feature 7) - Getting an invalid customer's ID.")
        console.log(data);
        if (data.length === 0) {
          console.log("Test passed.");
        } else {
          console.log("Test FAILED.");
        }
      }
    )

    fetch("/api/rentMovie?inventoryId=" + "500" + "&customerId=" + "100").then(
      response => response.json()
    ).then(
      data => {
        console.log("TEST 5C (Feature 7) - Renting a film to a valid customer.")
        console.log(data);
        if (data.length === 2 && data[0].affectedRows === 1 && data[1].affectedRows === 1) {
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