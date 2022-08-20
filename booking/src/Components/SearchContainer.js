import React,{useState, useContext} from 'react'
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import './SearchContainer.css'
import { Bed,Person,CalendarMonth } from '@mui/icons-material'
import { DateRange } from 'react-date-range';
import { format } from 'date-fns';
import { SearchContext } from '../Context/SearchContext';
import { useNavigate } from 'react-router-dom';
function SearchContainer() {
    const[open, setOpen] = useState(false)
    const[openDates, setOpenDates] = useState(false)
    const navigate = useNavigate()
    const {dispatch} = useContext(SearchContext)
    const [destination,setDestination] =useState("")
    const[options, setOptions] = useState({
        room: 1
    })
    const [date, setDate] = useState([
        {
          startDate: new Date(),
          endDate: new Date(),
          key: 'selection'
        }
      ]);
    const handleClick = (name,operation) =>{
        setOptions((prev)=>{
            return{
                ...prev,
                [name]:operation === "i" ? options[name] + 1 : options[name] - 1,
            }
        })
    }
  
   
    const handleSearch = () =>{
        dispatch({type: "NEW_SEARCH", payload: {destination,options,date}})
        navigate("/hotels", {state: {destination,options,date}})
    }
  return (
    <div className='searchs'>
         <div className='inputsContainer'>
            <div className='inputs'>
                <Bed sx={{width: "38px !important", color: "darkgray", height: "38px !important",marginLeft: "18px !important"}}/>
                <input type='text' placeholder='Enter city' onChange={(e)=>setDestination(e.target.value)} />
            </div>
            <div className='inputs'>
                <CalendarMonth sx={{width: "38px !important", color: "darkgray", height: "38px !important",marginLeft: "18px !important"}}/>
                <span onClick={()=>setOpenDates(!openDates)}>{`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(date[0].endDate, "MM/dd/yyyy")}`} </span>
                {openDates && 
                    <div className='dates' >
                        <DateRange 
                            onChange={item => setDate([item.selection])}
                            editableDateInputs={true}
                            moveRangeOnFirstSelection={false}
                            ranges={date}
                            className='dateRanges'
                            showSelectionPreview={true}
                            minDate={ new Date()}
                        />
                    <button className='backss' onClick={()=> setOpenDates(!openDates)}>continue</button>

                  </div>
                }
            </div>
            <div className='inputs' >
                <Person sx={{width: "38px !important", color: "darkgray", height: "38px !important"}}/>
                <p onClick={()=> setOpen(!open)}>Book a room</p>
            { open && <span >
                <div className='rRooms'>
                    <button disabled={options.room <= 0} onClick={()=> handleClick("room", "d")} className='backs'>-</button>
                        <p>{options.room}</p>
                    <button  onClick={()=> handleClick("room", "i")} className='backs'>+</button>
                    <button className='back' onClick={()=> setOpen(!open)}>continue</button>
                </div>
            </span>}
            </div>
            <button onClick={handleSearch}>Search</button>
            
        </div>
    </div>
  )
}

export default SearchContainer