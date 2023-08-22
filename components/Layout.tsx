import React, { ReactNode } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import AppBottomBar from "./AppBottomBar";

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = "NativAI" }: Props) => {
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <main>{children}</main>
      {(router.pathname === "/" || router.pathname === "/profile") && (
        <footer>
          <AppBottomBar />
        </footer>
      )}
    </div>
  );
};

export default Layout;
