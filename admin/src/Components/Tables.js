import React from 'react'
import './Table.css'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
const rows = [
    {
        id: 1,
        product: "ACER",
        image:"/images/work.png",
        customer: "John",
        date: "1stMarch",
        amountr: 5678,
        method: "delivery",
        status: "Approved"
    }   
    ,{
        id: 2,
        product: "DELL",
        image:"/images/work.png",
        customer: "Doe",
        date: "2stMarch",
        amountr: 578,
        method: "online",
        status: "Pending"
    }   ,{
        id: 3,
        product: "OS",
        image:"/images/work.png",
        customer: "Ken",
        date: "3stMarch",
        amountr: 58978,
        method: "delivery",
        status: "Approved"
    }   ,{
        id: 4,
        product: "WINDOWS",
        image:"/images/work.png",
        customer: "Wandia",
        date: "4stMarch",
        amountr: 678,
        method: "delivery",
        status: "Failed"
    }
]
function Tables() {

  return (
    
    <TableContainer component={Paper} className='table'>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className='ttablecells'>Tracking ID</TableCell>
            <TableCell className='ttablecells'>Product</TableCell>
            <TableCell className='ttablecells'>Customer</TableCell>
            <TableCell className='ttablecells'>Date</TableCell>
            <TableCell className='ttablecells'>Amountr</TableCell>
            <TableCell className='ttablecells'>Method</TableCell>
            <TableCell className='ttablecells'>Status</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell className='tablecell'>{row.id}</TableCell>
              <TableCell className='tablecell'>
                <div className='tImage'>
                  <img src={row.image} alt='' />
                  {row.product}
                </div>
              </TableCell>
              <TableCell className='tablecell'>{row.customer}</TableCell>
              <TableCell className='tablecell'>{row.date}</TableCell>
              <TableCell className='tablecell'>{row.amountr}</TableCell>
              <TableCell className='tablecell'>{row.method}</TableCell>
              <TableCell className='tablecell'>
                <span className={`status ${row.status}`}>
                {row.status}
                </span>
                </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default Tables