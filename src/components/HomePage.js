import React, { useEffect, useState } from 'react'
import { Box, Grid, Card, Typography, IconButton } from '@mui/material'
import { Info } from '@mui/icons-material'

function HomePage() {

  const [top5Movies, setTop5Movies] = useState([{}]);
  const [selectedMovie, setSelectedMovie] = useState();
  const [top5Actors, setTop5Actors] = useState([{}]);
  const [selectedActor, setSelectedActor] = useState();
  const [selectedActorsMovies, setSelectedActorsMovies] = useState([{}]);

  useEffect(() => {
    fetch("/api/top5Movies").then(
      response => response.json()
    ).then(
      data => {
        setTop5Movies(data);
        console.log(data);
      }
    )
    fetch("/api/top5Actors").then(
      response => response.json()
    ).then(
      data => {
        setTop5Actors(data);
        console.log(data);
      }
    )
  }, []);

  function selectMovie (filmId) {
    fetch("/api/movieInfo?filmId=" + filmId).then(
      response => response.json()
    ).then(
      data => {
        setSelectedMovie(data[0]);
      }
    )
  }

  function selectActor (actorId, actorsName) {
    setSelectedActor(actorsName);
    fetch("/api/actorsTopMovies?actorId=" + actorId).then(
      response => response.json()
    ).then(
      data => {
        setSelectedActorsMovies(data);
      }
    )
  }

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }} >
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Card variant="outlined" sx={{ padding: 2 }}>
            <Typography variant="h6">Top 5 Movies</Typography>
            {(typeof top5Movies === 'undefined') ? "" : top5Movies.map((movie) => {
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
        <Grid item xs={6}>
          <Card variant="outlined" sx={{ padding: 2 }}>
            <Typography variant="h6">Top 5 Actors</Typography>
            {(typeof top5Actors === 'undefined') ? "" : top5Actors.map((actor) => {
              return <Grid container spacing={1} direction="row" justifyContent="flex-start" alignItems="center">
                <Grid item xs={1}>
                  <IconButton aria-label="info" onClick={() => {
                    selectActor(actor.actor_id, actor.first_name + " " + actor.last_name);
                  }}>
                    <Info />
                  </IconButton>
                </Grid>
                <Grid item xs='auto'>
                  <div>{actor.first_name} {actor.last_name}</div>
                </Grid>
              </Grid>
            })}
          </Card>
          <Card variant="outlined" sx={{ padding: 2 }}>
            <Typography variant="h6">Actor Details</Typography>
            {(typeof selectedActor === 'undefined') ? <i>No actor is selected</i> : <div>
              <p><b>{selectedActor}</b></p>
              <Typography variant="h6">Actor's Top 5 Movies</Typography>
              {selectedActorsMovies.map((movie) => {
                return <Grid container spacing={1} direction="row" justifyContent="flex-start" alignItems="center">
                  <Grid item xs='auto'>
                    <div>{movie.title}</div>
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

export default HomePage