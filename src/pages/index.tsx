import Head from "next/head";
import PersonalFinances from "./personal";
import { useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import LogButton from "@/src-client/components/LogIn/button";

export default function Home() {
  const {data: session} = useSession({required: true})
  console.log(session)
  if(session && session.user ){
    return (
      <>
        <Head>
          <title>Finanzas Personales</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
          <div className="container-graphics">
            <PersonalFinances />
          </div>
        </main>
      </>
    );
  } else  {
    return (
    <div>
        <h1>Landing</h1>
    </div>
    )
  }
}
