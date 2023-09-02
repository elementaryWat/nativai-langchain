import React, { useEffect } from "react";
import SignInComponent from "../components/AuthComponent/SigninButton";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const Login: React.FC = () => {
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.push("/");
    }
  }, [session]);

  return <SignInComponent />
};

export default Login;
