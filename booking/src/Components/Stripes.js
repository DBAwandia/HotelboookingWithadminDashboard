import React, {useEffect,useState} from 'react'
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios'
function Stripes(){
const [stripeToken, setStripeToken] = useState(null)
const[ lebel,setLebel] = useState([])
const onToken = (token) =>{
    setStripeToken(token)
}
useEffect(()=>{
    const makeRequest = async()=>{
        try{
            const res = await axios.post("http://localhost:5000/stripe/payments",{
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