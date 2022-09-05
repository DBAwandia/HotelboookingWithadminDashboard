import React,{useState,useContext,useEffect,useRef} from 'react'
import './OrderHistory.css'
import useFetch from '../Hooks/useFetch'
import { LoginContext } from '../Context/LoginContext';
// import vi from 'timeago.js/lib/lang/vi';
import ReactPaginate from 'react-paginate';
import ReactToPrint from "react-to-print";
import { SearchContext } from '../Context/SearchContext';
// import TimeAgo from 'timeago-react'
import Moment from 'react-moment';
import 'moment-timezone';
import {Cancel} from '@mui/icons-material'
// const dummyDta = [
//     {
//         age: 45,
//         amount: 456,
//         time: "one Month ago"
//     },
//     {
//         age: 42,
//         amount: 56,
//         time: "two Month ago"
//     },
//      {
//         age: 36,
//         amount: 451,
//         time: "just now"
//     }
// ]
function OrderHistory({setSidebar,ref}) {
    const { user} = useContext(LoginContext)
    const id = user._id
    // console.log(id,user)
    const {data} = useFetch(`http://localhost:5000/userr/orderlist/${id}`)
    // console.log(data)
    const [currentItems, setCurrrentItems] = useState(null)
    const [pageCount, setPageCount] = useState(0)
    const [offSet, setOffset] = useState(0)
    const itemPerPage= 2
   
    useEffect(()=>{
        const endOffset = offSet + itemPerPage
        setCurrrentItems(data.slice(offSet, endOffset))
        setPageCount(Math.ceil(data.length/itemPerPage))
    },[offSet, data,itemPerPage])

    const handlePageClick = (event) =>{
        setOffset(event.selected * itemPerPage)
    }
    let componentRef = useRef();
    const {date} =useContext(SearchContext)
    const start = date.startdate
    const end = date.enddate
    console.log(start,end)
  return (
    <div className='OrderHistory'>
       
              <Cancel onClick={()=>setSidebar(false)} sx={{position: "absolute",top:39,color: 'red', right: 70,cursor:"pointer", fontSize: 45}}/>
             
       <div style={{width: "100%",height:"100%"}}>
       
       <div className='OrderHistoryContainer' ref={(el) => (componentRef = el)}>
            <h1>YOUR ORDER HISTORY</h1>
            <div className='OrderrContains'>
                 {currentItems?.map((item)=>{
            return <div className='orderObjects' 
            key={item._id}
            >
                    <div className='orderObjectsContainer'>
                        <div className='objalign'>
                            <p>Orderid:</p><b>{item._id}</b>
                        </div>
                        <div className='objalign'>
                            <p>Validity:</p><b>{item.days}</b>
                        </div>
                        <div className='objalign'>
                            <b>Amount paid:</b><p> ${item.amount}</p>
                        </div>
                        <div className='objalign'>
                        <b>Date:</b><p style={{color:"white", fontSize: 22,marginLeft: 15,letterSpacing: 2}}>
                                <Moment format="DD/MM/YYYY" fromNow>
                                 {item.createdAt}
                                </Moment>
                            </p>
                        </div>
                        <div className='objalign'>
                            <p style={{color:"white", fontSize: 22,marginLeft: 105,letterSpacing: 2}}>
                                <Moment  fromNow>
                                   {item.createdAt}
                                   {/* {"1979-04-19T12:59-0500"} */}
                                </Moment>
                            </p>
                        </div>
                    </div>
                   </div>
        })}
            </div>
          
              <ReactPaginate
            breakLabel="..."
            nextLabel={">>"}
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            pageCount={pageCount}
            previousLabel={"<<"}
            renderOnZeroPageCount={null}
            breakLinkClassName="break_link"
            containerClassName="pagination"
            pageLinkClassName="page_num"
            activeLinkClassName="active"
            previousLinkClassName="page_num"
            nextLinkClassName="page_num"
          />
                <ReactToPrint
                    trigger={() => <p style={{cursor:"pointer", fontSize:"14px",marginTop:"20px",color:"lightgray",padding: 10}}>print/download</p>}
                    content={() => componentRef}
                />
        </div>
      
       </div>
            
    </div>
  )
}

export default OrderHistory