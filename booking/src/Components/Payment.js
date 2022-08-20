import './Payments.css'
import {useNavigate} from 'react-router-dom'
function Payment(){
    const navigate = useNavigate()
    const handleContinue = (e)=>{
        e.preventDefault()
        navigate("/")
    }
    return(
        <div className='paymments'>
            <h1>SUCESSFULLY PAID</h1>
            <p>CONGRATULATIONS</p>
            <button onClick={handleContinue}>Continue</button>
        </div>
    )
}
export default Payment