import React, { useEffect } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router';
import style from './SigninButton.module.css'
import { BsGoogle } from "react-icons/bs";
import logo from '../../asset/img/nativaisinfondo.png'
import Image from 'next/image';



const SigninButton = () => {

  const router = useRouter();

  const handleClick = async () => {
    const res = await signIn('google');
    console.log(res)
    router.push('/');
  };

  return (
    <div className={style.signin_container}>
        <div className={style.hero_login}>
            {/* <img src={logo} alt="" /> */}
            <Image src={logo} alt="Logo" />
        </div>
        <div className={style.container_button}>
            <button  onClick={handleClick} className={style.butto_signin}>
                <BsGoogle/> <span>Inicia Sesion</span>
            </button>
        </div>
    </div>

  )
}

export default SigninButton