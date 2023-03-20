import Head from "next/head";
import InfoCards from "./components/InfoCards";
import { Nav, Footer } from "./components/layout";

export default function Home() {
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
