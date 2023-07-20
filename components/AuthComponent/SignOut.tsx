import { signOut, useSession } from 'next-auth/react';
import React from 'react';
import { useRouter } from 'next/router';

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
        <div className=''>
          <p className=''>{session.user.name}</p>
          <button onClick={handleSignOut} className=''>
            SignOut
          </button>
        </div>
      ) : (
        <p>No hay sesión activa</p>
      )}
    </div>
  );
};
