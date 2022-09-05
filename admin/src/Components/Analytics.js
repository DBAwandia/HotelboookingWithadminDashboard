import React,{useState,useEffect,useMemo} from 'react'
import './Analytics.css'
import { ArrowUpward, ArrowDownward } from '@mui/icons-material'
import Progress from './Progress'
import useFetch from './useFetch'
import Charts from './Charts'
import axios from 'axios'
import {Link} from 'react-router-dom'
import Tables from './Tables'
import {axiosInstance} from "../Utils/Utils"
function Analytics() {
  const [list, setList] = useState([])
  const {data} = useFetch("/userr/countByEmails")
  const obj= "/Bookorders/getAmount"
  const url = "/userr/stats"
  useEffect(()=>{
    const fetchData = async(obj)=>{
      try{
        const res = await axiosInstance.get(obj)
        setList(res.data)
      }catch(err){}
    }
    fetchData(obj)

  },[])
  let sum = 0
    for(let i= 0; i< list.length; i++){
       sum += list[i];
    }
  const allData = sum.toLocaleString("en-us")
  // console.log(allData)
  //get total users per month and compare percentage
  const MONTHS = useMemo(()=>[

      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec"
  ],[])
  //compare last two months of user stats
  const [userData, setUserData] = useState([])
  const[calc , setCalc] = useState(0)
  useEffect(()=>{
    const getUserData = async()=>{
      try{
        const res = await axiosInstance.get("/userr/monthstats")
        setUserData(res.data)
        setCalc((res.data[0].total * 100)/res.data[1].total - 100)
      }catch(err){
        console.log(err)
      }
    }
    getUserData()
  },[])
  console.log(userData, calc)
  //mongodb income stats
  const [income, setIncome] = useState([])
  const [perc, setPerc] = useState(0)
  useEffect(()=>{
      const getIncome = async() =>{
        try{
            const response = await axiosInstance.get("/Bookorders/stats")
            setIncome(response.data)
            setPerc((response.data[0].total*100)/response.data[1].total - 100)
        }catch(err){}
      }
      getIncome()
  },[])
  const persent = perc.toFixed(2)
  return (
    <div className='analytics'>
      <div className='analyticContainer'>
        <div className='analyicContain'>
          <div className='analyticChart'>
            <h1 className='analyticChartss'>Users</h1>
            <div className='analyticRating'>
              <span>All users: {data}</span>
              <p>{calc}%</p>
              <p>This month users: {userData[1]?.total}</p>
             {calc < 0 ? <ArrowUpward sx={{ fontSize: 25, color: "green"}} /> :  <ArrowUpward  sx={{ fontSize: 25, color: "green"}}/> }

            </div>
            <Link to="/users">
            <p className='analyicDesc'>
              See all users
            </p>
            </Link>

          </div>
        </div>
        <div className='analyicContain'>
          <div className='analyticChart'>
            <h1 className='analyticChartss'>Sales</h1>
            <div className='analyticRating'>
              <span>This month income: ${income[1]?.total}</span>
              <p>{persent}%</p>
              {persent < 0 ? (<ArrowUpward sx={{ fontSize: 25, color: "green"}} />) :  (<ArrowUpward  sx={{ fontSize: 25, color: "green"}}/>) }

            </div>
            <p className='analyicDesc'>
              See all orders
            </p>
          </div>
        </div>
        <div className='analyicContain'>
          <div className='analyticChart'>
            <h1 className='analyticChartss'>Earnings</h1>
            <div className='analyticRating'>
              <span style={{color: "green"}}>Total incomes: ${allData}</span>
              <p>-23.5%</p>
              <ArrowDownward  sx={{ fontSize: 25, color: "red"}}/>
            </div>
            <p className='analyicDesc'>
              See all Earnings
            </p>
          </div>
        </div>
        <div className='analyicContain'>
          <div className='analyticChart'>
            <h1 className='analyticChartss'>My Balance</h1>
            <div className='analyticRating'>
              <span>$8,566</span>
              <p>-23.5%</p>
              <ArrowDownward  sx={{ fontSize: 25, color: "red"}}/>
            </div>
            <p className='analyicDesc'>
              See details
            </p>
          </div>
        </div>
      </div>
      <div className='reactCharts'>
        <div className='analtycsCharts'>
          <div className='progressAnalytics'>
            <Progress/>
          </div>
          <div className='chartsAnalytics'>
            <Charts   title='Registered users past 6(Month(s))'/>
          </div>
        </div>
      </div>
      <div className='analyticTable'>
        <Tables />
      </div>
    </div>
  )
}

export default Analytics