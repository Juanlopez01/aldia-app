import "@/styles/styles.scss";
import type { AppProps } from "next/app";
import { store } from "../redux/store";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "../redux/store";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "@/src-client/components/Layout";
import "../styles/styles.css"


export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </PersistGate>
      </Provider>
    </SessionProvider>
  )
}
