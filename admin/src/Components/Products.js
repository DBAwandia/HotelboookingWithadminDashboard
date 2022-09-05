import React,{useState, useEffect} from 'react'
import './Produce.css'
import Navbar from './Navbar'
import axios from 'axios'
import { DataGrid } from '@mui/x-data-grid';
import {hotelColumns} from './DataTables'
import {useLocation,Link} from 'react-router-dom'
import Sidebar from './Sidebar'
import {axiosInstance} from "../Utils/Utils"

function Products() {
  const location = useLocation()
  const [data, setData] = useState([])
  const [list, setList] = useState([])
  const path = location.pathname.split("/")[1]
  const obj = `/hotel/${path}`
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

  const handleDelete = async(id)=>{
    try{
      await axiosInstance.delete(`/hotel/${path}/${id}`)
      setList(list.filter(item => item._id !== id))
    }catch(err){}

  }

  const actionColumns = [
    {
      field: "action",
      headerName: "Action",
      width: 250,
      renderCell: (params)=>{
        const ids = params.row._id
        return(
          <div className='cellAction'>
            <Link style={{textDecoration: "none"}}  to ={`/${path}/new`} >
              <div className='viewButton'>View</div>
            </Link>
            <div className='deleteButton' onClick ={()=>handleDelete(params.row._id)}>Delete</div>
            <Link to={`/${path}/${ids}`}>
              <div style={{border:"1px dotted orangered",padding:"5px",color:"teal", cursor:"pointer",marginLeft:"5px", width: 37, height: 14}}>Edit</div>
            </Link>
          </div>
        )
      }
    }
  ]
  return (
    <div className='products'>
       <Navbar/>
      <div className='productContainer'>
        <div className='producttContainer'>
          <Sidebar />
        </div>
        <div className='productContainer'>
          <div className='dataGrid'>
            <DataGrid
             rows={list}
             columns={hotelColumns.concat(actionColumns)}
            pageSize ={9}
            rowsPerPageSize={[9]}
            getRowId = {(row) => row._id}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Products