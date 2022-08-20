import React from 'react'

function Table({data}) {
  // const[added, setAdded] = useState([])
console.log(data)
  return (
    <div> 
       {data.map((item)=>{
      return   <div key={item.id}>
            <p>{item.name}</p>
            <p>{item.current_price}</p>
            <p>{(item.high_24h/100).toFixed(2) - (item.low_24h/100).toPrecision(2)}</p>
            <img src={item.image} alt=''/>
        </div>
    })}
    </div>
  )
}

export default Table