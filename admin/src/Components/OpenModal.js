import React from 'react'
import './OpenModal.css'
import axios from 'axios'
function OpenModal({id,data, setOpen}) {
    const handleDelete = async(id)=>{
            try{
                await axios.delete(`/api/deliverys/${id}`)
                data.filter(item => item._id !== id)
                setOpen(false)
            }catch(err){
                console.log(err)
            }
    }
  return (
    <div className='openModals'>
        <div className='modalContainer'>
            <div className='modalObject'>
                <h1>Are you sure you want to delete ?</h1>
                <div className='modalPosition'>
                    <button className='closeButton' onClick={()=>setOpen(false)}>Cancel</button>
                    <button className='openButton' onClick={()=>handleDelete(id)}>Delete</button>
                </div>
            </div>
        </div>

    </div>
  )
}

export default OpenModal