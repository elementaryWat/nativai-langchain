import React from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router';


const SigninButton = () => {


  return (
    <button onClick={()=>signIn('google')} className=''>
        Sign In
    </button>
  )
}


export default SigninButton