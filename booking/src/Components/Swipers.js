import { keys } from '@mui/system'
import React, { useState } from 'react'
import Table from './Table'
import { nameOptions, useSearch } from './useSearch'
// const users = [{
//   id: 1,
//   name: "kaka",
//   gmail: "kaka@gmail.com",
// },
// {
//   id: 2,
//   name: "mama",
//   gmail: "mama@gmail.com",
// },{
//   id: 3,
//   name: "babu",
//   gmail: "babu@gmail.com",
// },{
//   id: 4,
//   name: "dada",
//   gmail: "dada@gmail.com",
// }]
// keys = [ "name", "gmail"]

function Slider() {
  const[search,setSearch] = useState("")
  
  const {music,loading,error} = useSearch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=market_cap_desc&per_page=100&page=1&sparkline=false"
   )
  const keys=["name", "symbol"]
  const Search = (data) =>{
  return data.filter((item)=>(
    keys.some((key)=>(
        item[key].toLowerCase().includes(search)
    ))
  ))
}

  return (
    <div>
        <input style={{color:"black",background:"red"}} type='text' onChange={e=>setSearch(e.target.value.toLowerCase())} />
      <div>
     <Table data={Search(music)}/>
       </div> 
    </div>
  )
}

export default Slider