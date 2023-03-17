import Head from 'next/head'
import InfoCards from './InfoCards'


export default function Home() {
  return (
    <>
      <Head>
        <title>React Challenges</title>
        <meta name="description" content="React challenges by ChatGPT" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />


      </Head>
      <main className='main-app'>
        <InfoCards/>
      </main>
    </>
  )
}
