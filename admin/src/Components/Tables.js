import React, {useState, useEffect} from 'react'
import './Table.css'
import { DataGrid } from '@mui/x-data-grid';
import {orderColumns} from './DataTables'
import axios from "axios"
import {axiosInstance} from "../Utils/Utils"

function Tables() {
  const[open,setOpen] = useState(true)
  const[opens,setOpens] = useState(false)
  const [data, setData] = useState([])
  const [list, setList] = useState([])
  const obj = "/Bookorders/orders"
  const fetchData = async(obj)=>{
    try{
      const res = await axiosInstance.get(obj)
      setData(res.data)
    }catch(err){}
  }
  fetchData(obj)

  useEffect(()=>{
    setList(data)
  },[data])

  const actionColumn = [
    {
      field: "actions",
      headerName: "Status",
      width: 250,
      renderCell: (params) =>{
       
        const handleClick = async(id) =>{
          try{
            await axiosInstance.delete(`/Bookorders/orders/${id}`)
            setList(list.filter(item => item._id !== id))
          }catch(err){
            console.log(err)
          }
        }
        return <div className="statusButton">
                <p style={{color: "green",fontSize: 18}}>Paid</p>
                <div className="confirmButton">
                  <p style={{color: "red",fontSize: 18, cursor: "pointer"}} onClick={()=>handleClick(params.row._id)}>Delete</p>
                </div>

              </div>
      }
    }
  ]
  return (
      <div className='dataGrid'>
          <DataGrid
              rows={list}
              columns={orderColumns.concat(actionColumn)}
              pageSize ={5}
              rowsPerPageSize={[5]}
              getRowId = {(row) => row._id}
           />
          </div>
  )
}

export default Tables