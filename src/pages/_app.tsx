import "@/styles/styles.scss";
import type { AppProps } from "next/app";
import { store } from "../redux/store";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "../redux/store";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRouter } from "next/router";
import NavBarNvo from "@/src-client/components/NavBarNvo";
import "../styles/styles.css"
import Footer from "@/src-client/components/Footer";
import LandignPage from "@/src-client/components/LandingPage/LandingPage";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <NavBarNvo />
          {/* <NavBar page="home" /> */}

          <div className="pt-[75px]"></div>
          <Component {...pageProps} />
          <LandignPage />
          <Footer />
        </PersistGate>
      </Provider>
    </SessionProvider>
  )
}
