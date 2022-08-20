import React,{useState,useEffect} from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import './Users.css'
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios'
import {useLocation} from 'react-router-dom'
import {userColumns,userRows} from './DataTables'
// import useFetch from './useFetch'
import {Link} from 'react-router-dom'
function Users() {
  // const [data, setData] = useState(userRows)
  const location = useLocation()
  const path = location.pathname.split("/")[1]
  console.log(path)
  //useFetch
  const [list, setList] = useState([])
  const [lists, setLists] = useState([])

  // const {data, loading,error} = useFetch(`http://localhost:5000/userr/${path}`)
  
  
  //useFetch
  const obj =`/api/userr/${path}`
  const fetchData = async(obj) =>{
    try{
      const res = await axios.get(obj)
      setList(res.data)
    }catch(err){}

  }
  fetchData(obj)
  //item id
  const idss = list?.map(itemss=>itemss._id)

  useEffect(()=>{
    setLists(list)
  },[list])
  const handleDelete = async(uid)=>{
    // const id = list?.map(items=>items._id)
    try{
      await axios.delete(`/userr/${path}/${uid}`)
      setLists(lists.filter((item=> item._id !== uid)))

    }catch(err){}
  }
  console.log(lists)
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params)=>{
        const ids = params.row._id
        return(
          <div className='cellAction'>
            <Link style={{textDecoration: "none"}}  to ='/users/new' >
              <div className='viewButton'>View</div>
            </Link>
            <div className='deleteButton' onClick ={()=>handleDelete(params.row._id)}>Delete</div>
            <Link to={`/user/${path}/${ids}`}>
              <div style={{border:"1px dotted orangered",padding:"5px",color:"teal", cursor:"pointer",marginLeft:"5px", width: 37, height: 14}}>Edit</div>
              
            </Link>

          </div>
        )
      }
    }
  ]
  return (
    <div className='users'>
      <Navbar/>
      <div className='userContainer'>
       <div className='userrContainer'>
          <Sidebar />
        </div>
          <div style={{ height: 540,padding: 25, width: '100%' }} className='usersrContainer'>
            <div style={{border: "1px solid gray", padding: "15px"}}>
            
            <Link style={{textDecoration: "none"}}  to ={`/${path}/new`}>
              <p>Add new user</p>
            </Link>
            </div>
            <DataGrid
              rows={lists}
              columns={userColumns.concat(actionColumn)}
              pageSize={9}
              rowsPerPageOptions={[9]}
              checkboxSelection
              className='dataGrid'
              getRowId={(row)=> row._id}
            />
        </div>
      </div>
    </div>
  )
}

export default Users