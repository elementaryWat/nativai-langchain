import { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "../store";
import { setPageView } from "../utils/analyticsMethods";
import { theme } from "../utils/MUITheme";
import { Analytics } from "@vercel/analytics/react";
import "../globals.css";
import { useRouter } from "next/router";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@mui/material/styles";
import Layout from "../components/Layout";
import "../style/global.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter();
  useEffect(() => {
    // analytics calls
    setPageView(router.pathname);

    const setHeight = () => {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };
    setHeight();

    // For adjusting the height according to the viewport
    window.addEventListener("resize", setHeight);

    return () => window.removeEventListener("resize", setHeight);
  }, []);

  return (
    <SessionProvider session={session}>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
          <Analytics />
        </Provider>
      </ThemeProvider>
    </SessionProvider>
  );
}

export default MyApp;
