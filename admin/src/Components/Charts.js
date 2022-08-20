import React from 'react'
import useFetch from './useFetch'
import './Charts.css'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

// const data = [
//   {
//     name: 'January',
//     Total: 1200
//   },
//     {
//     name: 'February',
//     Total: 1700
//   }
//   ,
//     {
//     name: 'March',
//     Total: 5200
//   },
//   {
//   name: 'April',
//   Total: 78400
// },
// {
// name: 'May',
// Total: 1200
// }
// ];

function Charts({title,data,totals}) {
  // const {data} = useFetch("http://localhost:5000/userr/countByEmails")

  return (
    <div className='chartss'>
      <div style={{margin: "30px 140px", fontSize: 25,color: "red"}} >{title}  </div>
    <ResponsiveContainer width="100%" height={400}>
          <AreaChart
            width={500}
            height={300}
            data={data}
            total={totals}
            margin={{
              top: 15,
              right: 20,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="2 3" className='cartesianGrid' />
            <Tooltip />
            <Area connectNulls type="monotone" dataKey="name"  fill="#8884d8" />
          </AreaChart>
        </ResponsiveContainer>
    </div>
  )
}

export default Charts