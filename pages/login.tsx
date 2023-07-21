import React, { useEffect } from 'react'
import SigninButton from '../components/AuthComponent/SigninButton'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

///////////////////////////////////////////////////////////
//Hacer componente y que se muestro si no se a logueado////
///////////////////////////////////////////////////////////


const Login: React.FC = () => {
  
    const { data: session } = useSession();
    const router = useRouter();
  
    useEffect(()=>{
        if (session) {
            router.push('/');
          }else{
            router.push('/login')
          }
        
    },[session,router])

    
  return (
    <SigninButton/>
  )
}


export default Login