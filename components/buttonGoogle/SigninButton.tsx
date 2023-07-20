import React from 'react'
import { signOut, useSession } from 'next-auth/react'


const SigninButton = () => {

    const {data :session} = useSession()

    if(session && session.user){
        return (
            <div className='flex gap-4 ml-auto'>
                <p className='text-sky-600'>{session.user.name}</p>
                <button onClick={()=>signOut()} className='text-red-600'>
                    SignOut
                </button>
            </div>
        )
    }


  return (
    <div>SigninButton</div>
  )
}


export default SigninButton