import React, { useEffect, useState } from 'react'
import { Box, Grid, Card, Typography, TextField, Button, IconButton } from '@mui/material'
import { Info } from '@mui/icons-material'

function MoviesPage() {

  const [filmName, setFilmName] = useState("");
  const [actorName, setActorName] = useState("");
  const [filmGenre, setFilmGenre] = useState("");
  const [searchedMovies, setSearchedMovies] = useState();
  const [selectedMovie, setSelectedMovie] = useState();
  const [tempCustomerId, setTempCustomerId] = useState();
  const [selectedCustomer, setSelectedCustomer] = useState();
  const [movieInventory, setMovieInventory] = useState();

  useEffect(() => {
    
  }, []);

  function searchMovies () {
    fetch("/api/searchMovies?filmName=" + filmName + "&actorName=" + actorName + "&filmGenre=" + filmGenre).then(
      response => response.json()
    ).then(data => {
      setSearchedMovies(data);
    })
  }

  function selectMovie (filmId) {
    fetch("/api/movieInfo?filmId=" + filmId).then(
      response => response.json()
    ).then(data => {
      setSelectedMovie(data[0]);
    })
  }

  function getMovieInventory (filmId) {
    fetch("/api/getMovieInventory?filmId=" + filmId).then(
      response => response.json()
    ).then(data => {
      setMovieInventory(data);
      console.log(data);
    })
  }

  function verifyCustomer () {
    if (tempCustomerId.length > 0) {
      fetch("/api/verifyCustomer?customerId=" + tempCustomerId).then(
        response => response.json()
      ).then(data => {
        setSelectedCustomer(data[0]);
      })
    }
  }

  function rentMovie (inventoryId) {
    fetch("/api/rentMovie?inventoryId=" + inventoryId + "&customerId=" + selectedCustomer.customer_id).then(
      response => response.json()
    ).then(() => {
      getMovieInventory(selectedMovie.film_id)
    })
  }

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }} >
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Card variant="outlined" sx={{ padding: 2 }}>
            <Typography variant="h6">Search Movies</Typography>
            <p><TextField id="inpFilmName" label="Film Name" variant="filled" value={filmName} onChange={(event) => {
              if (/^[a-zA-Z0-9- ]{0,128}$/.test(event.target.value)) {
                setFilmName(event.target.value);
              }
            }}/></p>
            <p><TextField id="inpActorName" label="Actor Name" variant="filled" value={actorName} onChange={(event) => {
              if (/^[a-zA-Z0-9- ]{0,91}$/.test(event.target.value)) {
                setActorName(event.target.value);
              }
            }}/></p>
            <p><TextField id="inpFilmGenre" label="Film Genre" variant="filled" value={filmGenre} onChange={(event) => {
              if (/^[a-zA-Z0-9- ]{0,25}$/.test(event.target.value)) {
                setFilmGenre(event.target.value);
              }
            }}/></p>
            <p><Button id="searchButton" variant="contained" onClick={() => {
              searchMovies();
            }}>
              Search
            </Button></p>
          </Card>
          <Card variant="outlined" sx={{ padding: 2 }}>
            <Typography variant="h6">List of Movies</Typography>
            {(typeof searchedMovies === 'undefined') ? "" : searchedMovies.map((movie) => {
              return <Grid container spacing={1} direction="row" justifyContent="flex-start" alignItems="center">
                <Grid item xs={1}>
                  <IconButton aria-label="info" onClick={() => {
                    selectMovie(movie.film_id);
                    getMovieInventory(movie.film_id);
                  }}>
                    <Info />
                  </IconButton>
                </Grid>
                <Grid item xs='auto'>
                  <div>{movie.title}</div>
                </Grid>
              </Grid>
            })}
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card variant="outlined" sx={{ padding: 2 }}>
            <Typography variant="h6">Movie Details</Typography>
            {(typeof selectedMovie === 'undefined') ? <i>No movie is selected</i> : <div>
              <p><b>{selectedMovie.title}</b></p>
              <p><i>{selectedMovie.description}</i></p>
              <p>Release Year: {selectedMovie.release_year}</p>
              <p>Rating: {selectedMovie.rating}</p>
              <p>Genre: {selectedMovie.genre}</p>
              <p>Length: {Math.floor(selectedMovie.length/60)}h{selectedMovie.length%60}m</p>
              <p>Rental Price: ${selectedMovie.rental_rate}</p>
            </div>}
            {typeof movieInventory != 'undefined' && <div>
              <Typography variant="h6">Inventory</Typography>
              <p><TextField id="inpCustomerId" label="Customer ID" variant="filled" value={tempCustomerId} type='number' onChange={(event) => {
                setTempCustomerId(event.target.value);
              }}/></p>
              <p><Grid container spacing={1} direction="row" justifyContent="flex-start" alignItems="center">
                <Grid item xs={3.5}><Button id="selectCustomer" variant="contained" onClick={() => {
                  verifyCustomer();
                }}>
                  SELECT CUSTOMER
                </Button></Grid>
                <Grid item xs={4}>{typeof selectedCustomer === 'undefined' ? <i>No customer is selected.</i> : selectedCustomer.first_name + " " + selectedCustomer.last_name}</Grid>
              </Grid></p>
              {movieInventory.map((inventory) => {
                return <Grid container spacing={1} direction="row" justifyContent="flex-start" alignItems="center">
                  <Grid item xs={2}>
                    <Button id="rentButton" variant="contained" disabled={inventory.rented || typeof selectedCustomer === 'undefined'} style={{maxWidth: '90px', minWidth: '90px'}} onClick={() => {
                      rentMovie(inventory.inventory_id);
                    }}>
                      {inventory.rented ? "Rented" : "Rent"}
                    </Button>
                  </Grid>
                  <Grid item xs={2}>
                    <div>{inventory.inventory_id} (Store {inventory.store_id})</div>
                  </Grid>
                </Grid>
              })}
            </div>}
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default MoviesPage