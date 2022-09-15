import React, {useEffect,useState} from 'react'
import StripeCheckout from 'react-stripe-checkout';
import {axiosInstance} from "../Utils/Utils"
function Stripes(){
const [stripeToken, setStripeToken] = useState(null)
const[ lebel,setLebel] = useState([])
const onToken = (token) =>{
    setStripeToken(token)
}
useEffect(()=>{
    const makeRequest = async()=>{
        try{
            const res = await axiosInstance.post("/stripe/payments",{
                tokenID: stripeToken.id,
                amount: 1000
            })
            setLebel(res.data)
        }catch(err){
console.log(err)

        }
    }
    stripeToken && makeRequest()
},[stripeToken])

console.log(lebel)
    return(
    <div>
        <StripeCheckout
        name="practice"
        token={onToken}
        description='Buy'
        billingAddress
        stripeKey="pk_test_51LHrwyBVP5viye6wD4xBD8eSEKWLQTdrIdicuDlnosQ4XSvKIUMKJqwq3fOAPa03FSJHqGBdI07jIgzEToSxoFGh00Q4WdAkbQ"
        >
            <button>PAY</button>
        </StripeCheckout>
    </div>
    )
}

export default Stripes