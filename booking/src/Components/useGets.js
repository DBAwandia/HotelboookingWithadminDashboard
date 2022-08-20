import axios from 'axios'
import React, { useEffect, useState } from 'react'

export const nameOptions = {

    params: {all: 'true'},
    headers: {
        'X-RapidAPI-Key': '09df16184fmshc768623b7d752e4p1584a8jsn8f7f92ea1b63',
        'X-RapidAPI-Host': 'odds.p.rapidapi.com'
    }
};
export const useGet =(url)=>{
    const[loading, setLoading] = useState(false)
    const[error, setError] = useState(false)
    const[data, setData] = useState([])

  
        useEffect(()=>{
            
        const fetData = async ()=>{
            setLoading(true)
            try{
                const res = await axios.get(url,nameOptions)
                setData(res.data)
            }catch(error){
                setError(error)
            }
        setLoading(false)
        }
        fetData()

        },[url])
    
const refetch = async()=>{
    setLoading(true)
   
        try{
            const res = await axios.get(url)
            setData(res.data)
        }catch(error){
            setError(error)
        }
    setLoading(false)

}
return{ data, loading, refetch,error};
}

