import React from 'react'
 import {FaEnvelopeOpenText, FaRocket} from "react-icons/fa6"

const NewsLetter = () => {
  return (
    <div>
      <div> 
    <h3 className='text-lg font-bold mb-2 flex items-center gap-2'>
        <FaEnvelopeOpenText/>
        Email me for jobs
    </h3>
    <p className='text-primary/75 text-base mb-4'> If you are intersted then only apply.
    Otherwise , your account may be reported by the support team.</p>
    <div className='w-full space-y-4'>
        <input type='email' name="email" id="email" placeholder="name@mail.com"  className="w-full block py-2
        pl-3 border focus:outline-none" />
        <input type='submit' value={"Subscribe"}  className='w-full block py-2 pl-3 border focus:outline-none
        bg-blue rounded-sm text-white cursor-pointer'/>
    </div>
      </div>
      {/* 2nd Part */}
      <div> 
    <h3 className='text-lg font-bold mb-2 flex items-center gap-2'>
        <FaRocket/>
       Get Noticed Faster
    </h3>
    <p className='text-primary/75 text-base mb-4'> For quick response ,
    Upload  updated resume.</p>


    <div className='w-full space-y-4'>
        
        <input type='submit' value={"Upload your resume"}  className='w-full block py-2 pl-3 border focus:outline-none
        bg-blue rounded-sm text-white cursor-pointer'/>
    </div>
      </div>

    </div>
  )
}

export default NewsLetter
