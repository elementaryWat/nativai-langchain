'use client'
import React from 'react'
import SigninButton from '../components/AuthComponent/SigninButton'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const Login: React.FC = () => {
    const {data:session} = useSession()
    const router = useRouter()
    if(session){
        router.push('/')
    }


  return (
    <SigninButton/>
  )
}


export default Login