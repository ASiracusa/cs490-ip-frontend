import React, { useEffect, useState } from 'react'
import { Box, Grid, Card, Typography, TextField, Button, IconButton, Checkbox, Select, MenuItem, FormControl, InputLabel } from '@mui/material'
import { Info } from '@mui/icons-material'

function CustomersPage() {

  const [customerId, setCustomerId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [searchedCustomers, setSearchedCustomers] = useState();
  const [selectedCustomer, setSelectedCustomer] = useState();
  const [customersRentals, setCustomersRentals] = useState();
  const [userDeleted, setUserDeleted] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(false);
  const [eFirstName, setEFirstName] = useState("");
  const [eLastName, setELastName] = useState("");
  const [eActive, setEActive] = useState(false);
  const [eEmail, setEEmail] = useState("");
  // const [eAddress, setEAddress] = useState("");
  // const [eCity, setECity] = useState("");
  // const [eCountry, setECountry] = useState("");
  const [eStoreId, setEStoreId] = useState("");

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
    setUserDeleted(false);
    setEditingCustomer(false);
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

  function returnRental (rentalId, inventoryId) {
    fetch("/api/returnRentalInv?inventoryId=" + inventoryId).then(
      response => response.json()
    )
    fetch("/api/returnRental?rentalId=" + rentalId).then(
      response => response.json()
    ).then(
      selectCustomer(customerId)
    );
  }

  function deleteCustomer (customerId) {
    fetch("/api/deleteCustomer?customerId=" + customerId).then(
      response => response.json()
    ).then(() => {
      setSelectedCustomer(undefined);
      searchCustomers();
    });
  }

  function prefillCustomerInfo () {
    setEditingCustomer(true);
    setEFirstName(selectedCustomer.first_name);
    setELastName(selectedCustomer.last_name);
    setEActive(selectedCustomer.active);
    setEEmail(selectedCustomer.email);
    // setEAddress(selectedCustomer.address);
    // setECity(selectedCustomer.city);
    // setECountry(selectedCustomer.country);
    setEStoreId(selectedCustomer.store_id);
  }

  function saveCustomerInfo () {
    fetch("/api/updateCustomerDetails?customerId=" + selectedCustomer.customer_id +
                                  "&addressId=" + selectedCustomer.address_id + 
                                  "&firstName=" + eFirstName +
                                  "&lastName=" + eLastName +
                                  "&active=" + eActive +
                                  "&email=" + eEmail +
                                  // "&address=" + eAddress +
                                  // "&city=" + eCity +
                                  // "&country=" + eCountry +
                                  "&storeId=" + eStoreId).then(
      response => response.json()
    ).then(() => {
      selectCustomer(selectedCustomer.customer_id);
    });
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
            {(typeof selectedCustomer === 'undefined') ? (
              userDeleted ?
                <i>Customer successfully deleted.</i> :
                <i>No customer is selected.</i>
            ) : (!editingCustomer ? <div>
              <p><b>{selectedCustomer.first_name} {selectedCustomer.last_name} ({selectedCustomer.customer_id})</b></p>
              <p>Active Status: {selectedCustomer.active ? 'Active' : 'Inactive'}</p>
              <p>Email: {selectedCustomer.email}</p>
              <p>Address: {selectedCustomer.address}, {selectedCustomer.city}, {selectedCustomer.country}</p>
              <p>Store ID: {selectedCustomer.store_id}</p>
              <p><Button variant="contained" color="primary" onClick={() => {
                prefillCustomerInfo();
              }}>
                EDIT CUSTOMER DETAILS
              </Button>{' '}
              <Button variant="contained" color="error" onClick={() => {
                deleteCustomer(selectedCustomer.customer_id);
              }}>
                DELETE CUSTOMER
              </Button></p>
              <Typography variant="h6">Customer's Rentals</Typography>
              {(typeof customersRentals === 'undefined') ? "" : customersRentals.map((rental) => {
                return <Card variant="outlined" sx={{ padding: 2 }}>
                  <p><b>{rental.title}</b></p>
                  <p>Rented: {(new Date(Date.parse(rental.rental_date))).toDateString()}</p>
                  <p>{rental.return_date !== null ?
                    'Returned: ' + (new Date(Date.parse(rental.return_date))).toDateString() :
                    <div>
                      <i>Not returned yet.</i>
                      <p><Button variant="contained" onClick={() => {
                        returnRental(rental.rental_id, rental.inventory_id);
                      }}>
                        Return
                      </Button></p>
                    </div>
                  }</p>
                  <p>Store ID: {rental.store_id}</p>
                </Card>
              })}
            </div> :
            <div>
              <p><TextField id="inpEFirstName" label="First Name" variant="filled" value={eFirstName} onChange={(event) => {
                setEFirstName(event.target.value);
              }}/>{' '}
              <TextField id="inpELastName" label="Last Name" variant="filled" value={eLastName} onChange={(event) => {
                setELastName(event.target.value);
              }}/></p>
              <p><Checkbox inputProps={{ 'aria-label': 'controlled' }} checked={eActive} onChange={(event) => {
                setEActive(event.target.checked);
              }}/>Active</p>
              <p><TextField id="inpEEmail" label="Email" variant="filled" value={eEmail} onChange={(event) => {
                setEEmail(event.target.value);
              }}/></p>
              {/* <p><TextField id="inpEAddress" label="Address" variant="filled" value={eAddress} onChange={(event) => {
                setEAddress(event.target.value);
              }}/>{' '}
              <TextField id="inpECity" label="City" variant="filled" value={eCity} onChange={(event) => {
                setECity(event.target.value);
              }}/>{' '}
              <TextField id="inpECountry" label="Country" variant="filled" value={eCountry} onChange={(event) => {
                setECountry(event.target.value);
              }}/></p> */}
              <p><FormControl sx={{ m: 1, minWidth: 120 }}><InputLabel id="inpEStoreIdLabel">Store ID</InputLabel><Select
                id="inpEStoreId"
                value={eStoreId}
                label="Store ID"
                autoWidth
                onChange={(event) => {
                  setEStoreId(event.target.value);
                }}
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
              </Select></FormControl></p>
              <p><Button variant="contained" onClick={() => {
                saveCustomerInfo();
              }}>
                SAVE
              </Button>
              <Button onClick={() => {
                setEditingCustomer(false);
              }}>
                CANCEL
              </Button></p>
            </div>)}
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default CustomersPage