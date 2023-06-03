import { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "../store";
import "../globals.css";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // when the page loads, set the variable
    const setHeight = () => {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };
    setHeight();

    // when the window is resized, we update the value of --vh
    window.addEventListener("resize", setHeight);

    // remove the listener when the component is unmounted
    return () => window.removeEventListener("resize", setHeight);
  }, []);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
