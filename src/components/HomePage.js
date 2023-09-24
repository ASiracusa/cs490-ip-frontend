import React, { useEffect, useState } from 'react'
import { Box, Grid, Card, Typography } from '@mui/material'

function HomePage() {

  const [top5Movies, setTop5Movies] = useState([{}]);
  const [top5Actors, setTop5Actors] = useState([{}]);

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

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }} >
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Card variant="outlined" sx={{ padding: 2 }}>
            <Typography variant="h6">Top 5 Movies</Typography>
            {(typeof top5Movies === 'undefined') ? "" : top5Movies.map((index) => {
              return <div>{index.title}</div>
            })}
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card variant="outlined" sx={{ padding: 2 }}>
            <Typography variant="h6">Top 5 Movies</Typography>
            {(typeof top5Actors === 'undefined') ? "" : top5Actors.map((index) => {
              return <div>{index.first_name} {index.last_name}</div>
            })}
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default HomePage