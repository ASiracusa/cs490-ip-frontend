import React, { useEffect, useState } from 'react'
import { Box, Typography, Button } from '@mui/material'
import { jsPDF } from "jspdf";

function ReportsPage () {

  useEffect(() => {
    
  }, []);

  function generateReport () {
    fetch("/api/getAllRentals").then(
      response => response.json()
    ).then(data => {
      var doc = new jsPDF();
      doc.setFont("courier");
      doc.setFontSize(6);
      doc.text("RenID", 5, 10);
      doc.text("InvID", 15, 10);
      doc.text("Rental Date", 25, 10);
      doc.text("Return Date", 50, 10);
      doc.text("Customer Name", 75, 10);
      doc.text("Film Title", 130, 10);
      doc.text("Rental Rate", 180, 10);

      var y = 13;
      for (var i = 0; i < data.length; i++) {
        doc.text(data[i].rental_id.toString(), 5, y);
        doc.text(data[i].inventory_id.toString(), 15, y);
        doc.text(new Date(Date.parse(data[i].rental_date)).toDateString(), 25, y);
        doc.text(data[i].return_date === null ? "NOT RETURNED" : new Date(Date.parse(data[i].return_date)).toDateString(), 50, y);
        doc.text(data[i].first_name + " " + data[i].last_name, 75, y);
        doc.text(data[i].title, 130, y);
        doc.text(data[i].rental_rate, 180, y);
        y += 3;
        if (y >= 290) {
          y = 13;
          doc.addPage();
          doc.text("RenID", 5, 10);
          doc.text("InvID", 15, 10);
          doc.text("Rental Date", 25, 10);
          doc.text("Return Date", 50, 10);
          doc.text("Customer Name", 75, 10);
          doc.text("Film Title", 130, 10);
          doc.text("Rental Rate", 180, 10);
        }
      }
      doc.save('rentals.pdf');
    })
  }

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }} >
      <p><Button id="generateReportButton" variant="contained" onClick={() => {
        generateReport();
      }}>
        Generate Reports PDF
      </Button></p>
    </Box>
  )
}

export default ReportsPage