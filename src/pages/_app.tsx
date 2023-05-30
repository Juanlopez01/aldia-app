import "@/styles/styles.scss";
import type { AppProps } from "next/app";
import { store } from "../redux/store";
import { Provider } from "react-redux";
import { SessionProvider, useSession } from "next-auth/react";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "../redux/store";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "@/src-client/components/NavBar";
import { useRouter } from "next/router";
import NavBarNvo from "@/src-client/components/NavBarNvo";
import "../styles/styles.css"
import Footer from "@/src-client/components/Footer";

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
          <Footer />
        </PersistGate>
      </Provider>
    </SessionProvider>
  );
}
