'use client'
import React, { useEffect } from 'react'
import SigninButton from '../components/AuthComponent/SigninButton'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const Login: React.FC = () => {
  
    const { data: session } = useSession();
    const router = useRouter();
  
    useEffect(()=>{
        if (session) {
            router.push('/');
          }else{
            router.push('/login')
          }
        
    },[session])

    
  return (
    <SigninButton/>
  )
}


export default Login