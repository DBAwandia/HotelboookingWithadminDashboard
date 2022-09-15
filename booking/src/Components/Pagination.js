import React, {useState, useEffect} from 'react'
import ReactPaginate from 'react-paginate';
import useFetch from '../Hooks/useFetch'
import "./Pagelink.css"

function Pagination(){
   const [currentItems, setCurrentItems] = useState(null)
   const [pageCount, setPageCount] = useState(0)
   const [itemsOffset, setItemsOffset ] = useState(0)
   const itemsPerPage = 2
   const {data} = useFetch("/Bookorders/orders")
   useEffect(()=>{
        const endOffset = itemsOffset + itemsPerPage
        setCurrentItems(data.slice(itemsOffset, endOffset))
        setPageCount(Math.ceil(data.length/itemsPerPage))
   },[itemsOffset, itemsPerPage, data])

   const handlePageClick = (event)=>{
        const newOffset = (event.selected * itemsPerPage ) % data.length
        setItemsOffset(newOffset)
   }

    return(
        <div >
          <div className='OrderrContains'>
                 {currentItems?.map((item)=>{
            return <div className='orderObjects' key={item._id}>
                    <div className='orderObjectsContainer'>
                        <div className='objalign'>
                            <p>Orderid:</p><b>{item._id}</b>
                        </div>
                        <div className='objalign'>
                            <p>Days:</p><b>{item.days}</b>
                        </div>
                      
                    </div>
                   </div>
        })}
            </div>
       <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        breakLinkClassName="break_link"
        containerClassName="pagination"
        pageLinkClassName="page_num"
        activeLinkClassName="active"
        previousLinkClassName="page_num"
        nextLinkClassName="page_num"
      />
        </div>
    )
}
export default Pagination