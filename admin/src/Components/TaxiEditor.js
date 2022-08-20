import React, {useEffect,useState} from 'react'
import './TaxiEditor.css'
import Navbar from './Navbar'
import useFetch from './useFetch'
import {DataGrid} from "@mui/x-data-grid"
import {Link} from 'react-router-dom'
import axios from 'axios'
import OpenModal from './OpenModal'
import Sidebar from './Sidebar'
import{ deliveryColumns} from './DataTables'
function TaxiEditor(){
    // const [open, setOpen] = useState(false)
    const [list, setList] = useState([])
    const {data,loading,error} =useFetch("/api/deliverys/finds")
    useEffect(()=>{
        setList(data)
    },[data])
    // const id = data.map(item=>item._id)
    // console.log(data)

    const actionColumn =[
        {
            field: "action",
            headerName: "ACTION",
            width: 300,
            renderCell:(params)=>{
                const id=params.row._id
                const handleDelete= async(id) =>{
                    await axios.delete(`/api/deliverys/delete/${id}`)
                    setList(
                    list.filter(item => item._id !== id)

                    )
                }
                return(
                    // <div className='models'>
                    <div className='actionEdit'>
                        <Link to="/delivery/delivery">
                            <p className='view'>View</p>
                        </Link>
                        <Link to={`/delivery/${id}`}>
                            <p className='edit'>Edit</p>
                        </Link>
                        <p className='delete' onClick={()=>handleDelete(params.row._id)}>Delete</p>
                    {/* </div> */}
                </div>
                )
            }
          }
    ]
    return(
        <div className='taxiEditor'>
            <Navbar />
            <div className='taxiEditorContainer'>
                <div className='taxiEditorContainers'>
                    <Sidebar />
                </div>
                <div className='taxiEditorContainerss'>
                    <div className='taxiEditorDatagrid'>
                    <DataGrid
                        rows={list}
                        pageSize={9}
                        rowsPerPageOptions={[9]}
                        checkboxSelection
                        getRowId={(row)=> row._id}
                        columns={deliveryColumns.concat(actionColumn)}
                    />
                   </div> 

                </div>
                {/* {!open && <div className='openModals'>
                    <OpenModal id={id} data={list} setOpen={setOpen} />
                </div>} */}
            </div>
        </div>
    )
}

export default TaxiEditor