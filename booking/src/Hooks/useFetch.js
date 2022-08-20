import axios from 'axios'
import React, {useState, useEffect} from 'react'

const useFetch =(url) =>{
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [data, setData ] =useState([])
    useEffect(()=>{
        const fetchData = async () =>{
            setLoading(true)
            try{
                const res = await axios.get(url);
                setData(res.data)
            }catch(err){
                setError(err)
            }
            setLoading(false)
        }
        fetchData()
    },[url])

    const reFetch = async () =>{
        setLoading(true)
        try{
            const res = await axios.get(url)
            setData(res.data)
        }catch(err){
            setError(err)
        }
        setLoading(false)
    }
  return { data, loading, error, reFetch }
  
}
export default useFetch