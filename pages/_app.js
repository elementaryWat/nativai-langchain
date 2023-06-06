import { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "../store";
// import { setPageView } from "../utils/analyticsMethods";
import "../globals.css";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    // analytics calls
    // setPageView(router.pathname);

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
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
