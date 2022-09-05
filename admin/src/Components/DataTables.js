import React  from 'react';
import './Produce.css'
import Moment from 'react-moment';
 export  const userColumns= [
  {
    field: "_id",
    headerName: "ID",
    width: 220
  },
  {
      field: "user",
      headerName: "User",
      width: 250,
      renderCell: (params)=>{
                return (
                    <div className='classwithimg'>
                      <img src={params.row.img || "/images/work.png"} alt='' />
                      {params.row.username}
                 </div>
                 )
      },
    },
    {
      field: "email",
      headerName: "Email",
      width: 270,
      
    }
]
export const userRows = [
    {
        id: 1,
        username: 'snow',
        image: "/images/work.png",
        status: "active",
        email: "1snow@gmail.com",
        age: 35
    }    ,{
        id: 2,
        username: 'snows',
        image: "/images/work.png",
        status: "inactive",
        email: "2snow@gmail.com",
        age: 42
    }
    ,{
        id: 3,
        username: 'Ken',
        image: "/images/work.png",
        status: "active",
        email: "3snow@gmail.com",
        age: 22
    }    ,{
        id: 4,
        username: 'snowzz',
        image: "/images/work.png",
        status: "active",
        email: "4snow@gmail.com",
        age: 56
    }    ,{
        id: 5,
        username: 'snow',
        image: "/images/work.png",
        status: "pending",
        email: "5snow@gmail.com",
        age: 34
    }  
]

export const hotelColumns = [
  {
    field:"_id",
    headerName: "ID",
    width: 180
  },
  {
    field:"name",
    headerName: "NAME",
    width: 130
  }
  ,
  {
    field:"city",
    headerName: "CITY",
    width: 130
  }
  ,
  {
    field:"title",
    headerName: "TITLE",
    width: 130
  }
  ,
  {
    field:"photos",
    headerName: "PHOTO",
    width: 270,
    renderCell:(params)=>{
      return(
        <div className='classwithimg'>
          <img src={params.row.photos[0] || "/images/work.png"} alt='' />
          <p style={{ fontSize: 13}}>{params.row.name}</p>
        </div>
      )
    }
  }

]

export const roomColumns = [
  {
    field: "_id",
    headerName: "ID",
    width: 180
  },
  {
    field: "title",
    headerName: "TITLE",
    width: 120
  }
  ,
  {
    field: "price",
    headerName: "PRICE",
    width: 100
  }
  ,
  {
    field: "maxPeople",
    headerName: "MAX-PEOPLE",
    width: 200
  }
  ,
  {
    field: "desc",
    headerName: "Desc",
    width: 220
  }
]
export const deliveryColumns = [
  {
    field: "_id",
    headerName: "ID",
    width: 180
  },
  {
    field: "name",
    headerName: "NAME",
    width: 120
  }
  ,
  {
    field: "city",
    headerName: "CITY",
    width: 100
  }
  ,
  {
    field: "info",
    headerName: "INFOMATION",
    width: 299,
    renderCell:(params)=>{
      return(
        <div className='renderImage'>
          <img  src={params.row.photos[1] || "/images/work.png"} alt='avatar' />
          <p>{params.row.name}</p>
        </div>
      )
    }
  }
  ,
  {
    field: "phonenumber",
    headerName: "PHONENUMBER",
    width: 220
  }
]

export const orderColumns = [
  {
    field: "name",
    headerName: "Customer",
    width: 190
  },
  {
    field: "phonenumbers",
    headerName: "Phonenumbers",
    width: 160
  }
  ,
  {
    field: "roomname",
    headerName: "BookedRoom",
    width: 150
  }
  ,
  {
    field: "days",
    headerName: "Validity",
    width: 90
  }
  ,
  {
    field: "amount",
    headerName: "Amount Paid", 
    width: 190
  }
  ,
  {
    field: "Info",
    headerName: "StartDate - EndDate",
    width: 230,
    renderCell: (params)=>{
      return <div className="Bookdate">
        <Moment format="DD/MM/YYYY">
        {params.row.dayone}
        </Moment>
            -
            <Moment format="DD/MM/YYYY">
            {params.row.daytwo}
            </Moment>
      </div>
    }

  }
]