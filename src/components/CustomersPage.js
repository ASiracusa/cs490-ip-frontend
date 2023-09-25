import React, { useEffect, useState } from 'react'
import { Box, Grid, Card, Typography, TextField, Button, IconButton } from '@mui/material'
import { Info } from '@mui/icons-material'

function CustomersPage() {

  const [customerId, setCustomerId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [searchedCustomers, setSearchedCustomers] = useState();
  const [selectedCustomer, setSelectedCustomer] = useState();
  const [customersRentals, setCustomersRentals] = useState();

  useEffect(() => {
    searchCustomers();
  }, []);

  function searchCustomers () {
    fetch("/api/searchCustomers?customerId=" + customerId + "&firstName=" + firstName + "&lastName=" + lastName).then(
      response => response.json()
    ).then(
      data => {
        setSearchedCustomers(data);
      }
    )
  }

  function selectCustomer (customerId) {
    fetch("/api/customerInfo?customerId=" + customerId).then(
      response => response.json()
    ).then(
      data => {
        setSelectedCustomer(data[0]);
      }
    )
    fetch("/api/customersRentals?customerId=" + customerId).then(
      response => response.json()
    ).then(
      data => {
        setCustomersRentals(data);
      }
    )
  }

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }} >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card variant="outlined" sx={{ padding: 2 }}>
            <Typography variant="h6">Search Customers</Typography>
            <p><TextField id="inpCustId" label="Customer ID" variant="filled" value={customerId} onChange={(event) => {
              setCustomerId(event.target.value);
            }}/></p>
            <p><TextField id="inpCustFirstName" label="First Name" variant="filled" value={firstName} onChange={(event) => {
              setFirstName(event.target.value);
            }}/></p>
            <p><TextField id="inpCustLastName" label="Last Name" variant="filled" value={lastName} onChange={(event) => {
              setLastName(event.target.value);
            }}/></p>
            <p><Button id="searchButton" variant="contained" onClick={() => {
              searchCustomers();
            }}>
              Search
            </Button></p>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card variant="outlined" sx={{ padding: 2 }}>
            <Typography variant="h6">List of Customers</Typography>
            {(typeof searchedCustomers === 'undefined') ? "" : searchedCustomers.map((customer) => {
              return <Grid container spacing={1} direction="row" justifyContent="flex-start" alignItems="center">
                <Grid item xs={1}>
                  <IconButton aria-label="info" onClick={() => {
                    selectCustomer(customer.customer_id);
                  }}>
                    <Info />
                  </IconButton>
                </Grid>
                <Grid item xs='auto'>
                  <div>{customer.first_name} {customer.last_name} ({customer.customer_id})</div>
                </Grid>
              </Grid>
            })}
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card variant="outlined" sx={{ padding: 2 }}>
            <Typography variant="h6">Customer Details</Typography>
            {(typeof selectedCustomer === 'undefined') ? <i>No customer is selected</i> : <div>
              <p><b>{selectedCustomer.first_name} {selectedCustomer.last_name} ({selectedCustomer.customer_id})</b></p>
              <p>Active Status: {selectedCustomer.active ? 'Active' : 'Inactive'}</p>
              <p>Email: {selectedCustomer.email}</p>
              <p>Address: {selectedCustomer.address}, {selectedCustomer.city}, {selectedCustomer.country}</p>
              <p>Store ID: {selectedCustomer.store_id}</p>
              <Typography variant="h6">Customer's Rentals</Typography>
              {(typeof customersRentals === 'undefined') ? "" : customersRentals.map((rental) => {
                return <Card variant="outlined" sx={{ padding: 2 }}>
                  <p><b>{rental.title}</b></p>
                  <p>Rented: {(new Date(Date.parse(rental.rental_date))).toDateString()}</p>
                  <p>{rental.return_date !== null ?
                    'Returned: ' + (new Date(Date.parse(rental.return_date))).toDateString() : <i>Not returned yet.</i>
                  }</p>
                  <p>Store ID: {rental.store_id}</p>
                </Card>
              })}
            </div>}
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default CustomersPage