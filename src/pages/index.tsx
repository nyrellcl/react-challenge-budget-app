import Head from "next/head";
import InfoCards from "./components/InfoCards";
import Nav from "./components/Nav";
import { useEffect } from "react";

export default function Home() {

  useEffect(()=>{
    alert("The following information is not financial advice, but merely resources for your reference.")
  }, [])

  return (
    <>
      <Head>
        <title>React Challenges</title>
        <meta name="description" content="React challenges by ChatGPT" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <main className="main-app">
        <InfoCards />
      </main>
    </>
  );
}
