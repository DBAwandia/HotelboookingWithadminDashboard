import React,{useState, useEffect} from 'react'
import './Produce.css'
import Navbar from './Navbar'
import axios from 'axios'
import { DataGrid } from '@mui/x-data-grid';
import {roomColumns} from './DataTables'
import {useLocation,Link} from 'react-router-dom'
import Sidebar from './Sidebar'
function Sales() {
  const location = useLocation()
  const [data, setData] = useState([])
  const [list, setList] = useState([])
  const path = location.pathname.split("/")[1]
  const obj = `/api/room/${path}`
  const fetchData = async(obj)=>{
    try{
      const res = await axios.get(obj)
      setData(res.data)
    }catch(err){}
  }
  fetchData(obj)

  useEffect(()=>{
    setList(data)
  },[data])

  const handleDelete = async(id)=>{
    try{
      await axios.delete(`/api/room/${path}/${id}`)
      setList(list.filter(item => item._id !== id))
    }catch(err){}

  }

  const actionColumns = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params)=>{
        return(
          <div className='cellAction'>
            <Link style={{textDecoration: "none"}}  to ={`/${path}/new`} >
              <div className='viewButton'>View</div>
            </Link>
            <div className='deleteButton' onClick ={()=>handleDelete(params.row._id)}>Delete</div>

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
             columns={roomColumns.concat(actionColumns)}
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

export default Sales