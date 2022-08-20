import axios from 'axios'
import React, {useState, useEffect} from 'react'

export const nameOptions = {

    params: {
      referenceCurrencyUuid: 'yhjMzLPhuIDl',
      URL:"https://coinranking1.p.rapidapi.com/coins?coins",
      timePeriod: '24h',
      'tiers[0]': '1',
      orderBy: 'marketCap',
      orderDirection: 'desc',
      limit: '50',
      offset: '0'
    },
    headers: {
      'X-RapidAPI-Key': '09df16184fmshc768623b7d752e4p1584a8jsn8f7f92ea1b63',
      'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
    }
  };
export const useSearch = (url)=>{
    const [loading, setLoading] = useState(false)
    const [music, setMusic] = useState([])
    const [error, setError] = useState(false)

    useEffect(()=>{
        setLoading(true)
        const fetchData = async()=>{
            try{
                const res = await axios.get(url,nameOptions)
                setMusic(res.data)
            }catch(err){
                setError(err)
            }
            setLoading(false)
        }
        fetchData()

    },[url])

    const reFetch = async()=>{
       setLoading(true)
            try{
                const res = await axios.get(url)
                setMusic(res.data)
            }catch(err){
                setError(err)
            }
            setLoading(false)
        }

        return {music,loading,error,reFetch}
    


}