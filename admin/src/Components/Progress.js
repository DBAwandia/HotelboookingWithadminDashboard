import React from 'react'
import './Progress.css'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import useFetch from './useFetch'

function Progress() {
  const {data} = useFetch("/api/userr/countByEmails")
    let total = 15000
    let datas = (total/(100*data))
    const percentage =datas
  return (
    <div className='progress'>
        <CircularProgressbar    value={percentage}
                                className='circularProgress'
                                strokeWidth={4}
                                text={`${percentage}%`} />
        <p>Users in pir gram</p>
        <span>{data} users</span>
    </div>
  )
}

export default Progress