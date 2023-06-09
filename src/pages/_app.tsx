import "@/styles/styles.scss";
import type { AppProps } from "next/app";
import { store } from "../redux/store";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "../redux/store";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRouter } from "next/router";
import NavBar from "@/src-client/components/Navbar/NavBar";
import "../styles/styles.css";
import Footer from "@/src-client/components/Footer";
import Head from "next/head";

export default function App({
	Component,
	pageProps: { session, ...pageProps },
}: AppProps) {
	return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Head>
            <title>AlDia App</title>
          </Head>
          <NavBar />
          {/* <NavBar page="home" /> */}
          <div className="pt-[75px]"></div>
          <Component {...pageProps} />
          <Footer />
        </PersistGate>
      </Provider>
    </SessionProvider>
  )
}
