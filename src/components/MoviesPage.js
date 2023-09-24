import React, { useEffect, useState } from 'react'
import { Box, Grid, Card, Typography, TextField, Button, IconButton } from '@mui/material'
import { Info } from '@mui/icons-material'

function MoviesPage() {

  const [filmName, setFilmName] = useState("");
  const [actorName, setActorName] = useState("");
  const [filmGenre, setFilmGenre] = useState("");
  const [searchedMovies, setSearchedMovies] = useState();
  const [selectedMovie, setSelectedMovie] = useState();

  useEffect(() => {
    
  }, []);

  function searchMovies () {
    fetch("/api/searchMovies?filmName=" + filmName + "&actorName=" + actorName + "&filmGenre=" + filmGenre).then(
      response => response.json()
    ).then(
      data => {
        setSearchedMovies(data);
      }
    )
  }

  function selectMovie (filmId) {
    fetch("/api/movieInfo?filmId=" + filmId).then(
      response => response.json()
    ).then(
      data => {
        setSelectedMovie(data[0]);
      }
    )
  }

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }} >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card variant="outlined" sx={{ padding: 2 }}>
            <Typography variant="h6">Search Movies</Typography>
            <p><TextField id="inpFilmName" label="Film Name" variant="filled" value={filmName} onChange={(event) => {
              setFilmName(event.target.value);
            }}/></p>
            <p><TextField id="inpActorName" label="Actor Name" variant="filled" value={actorName} onChange={(event) => {
              setActorName(event.target.value);
            }}/></p>
            <p><TextField id="inpFilmGenre" label="Film Genre" variant="filled" value={filmGenre} onChange={(event) => {
              setFilmGenre(event.target.value);
            }}/></p>
            <p><Button id="searchButton" variant="contained" onClick={() => {
              searchMovies();
            }}>
              Search
            </Button></p>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card variant="outlined" sx={{ padding: 2 }}>
            <Typography variant="h6">List of Movies</Typography>
            {(typeof searchedMovies === 'undefined') ? "" : searchedMovies.map((movie) => {
              return <Grid container spacing={1} direction="row" justifyContent="flex-start" alignItems="center">
                <Grid item xs={1}>
                  <IconButton aria-label="info" onClick={() => {
                    selectMovie(movie.film_id);
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
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default MoviesPage