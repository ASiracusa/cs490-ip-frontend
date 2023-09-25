import React from 'react'
import { AppBar, Typography, Grid } from '@mui/material'
import { Link } from 'react-router-dom'

function Navbar() {

  return (
    <AppBar position="static" sx={{ padding: 2 }}>
        <Grid container spacing={2}>
            <Grid item xs={8}>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Movies Website
                </Typography>
            </Grid>
            <Grid item xs={1}>
                <Link to="/">Home</Link>
            </Grid>
            <Grid item xs={1}>
                <Link to="/movies">Movies</Link>
            </Grid>
            <Grid item xs={1}>
                <Link to="/customers">Customers</Link>
            </Grid>
            <Grid item xs={1}>
                <Link to="/reports">Reports</Link>
            </Grid>
        </Grid>
        
    </AppBar>
  )
}

export default Navbar