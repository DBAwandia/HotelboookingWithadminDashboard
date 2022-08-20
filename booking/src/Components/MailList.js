import React from 'react'
import './MailList.css'
function MailList() {
  return (
    <div className='maillist'>
      <form typeof='submit'>
        <h1>Save Money, Save on discount</h1>
        <p>Leave a wishlist</p>
          <div className='Align'>
            <input type='text' placeholder='Enter your email' />
            <button>Subscribe</button>
          </div>
      </form>
    </div>
  )
}

export default MailList