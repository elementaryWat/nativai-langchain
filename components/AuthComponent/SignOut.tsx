import { signOut, useSession } from 'next-auth/react';
import React from 'react';
import { useRouter } from 'next/router';
import style from './SignOut.module.css'

export const SignOut = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleSignOut = () => {
    router.push('/login');
    signOut();
  };

  return (
    <div>
      {session?.user ? (
        <div className={style.signOut_container}>
          <p className={style.signOut_saludo}>Hello, {session.user.name}</p>
          <button onClick={handleSignOut} className={style.signOut_button}>
            SignOut
          </button>
        </div>
      ) : (
        <p>No hay sesión activa</p>
      )}
    </div>
  );
};
