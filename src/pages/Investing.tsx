import React from 'react'
import Head from 'next/head'
import Layout from '../components/Layouts/layout'
import Image from 'next/image'
import heroImg from "../../public/assets/plant-dollar.jpg"
import BarChart from '../components/Chart/BarChart'
import ResourceInvest from '../components/ResourceInvest'

function Investing() {
  return (
    <>
    <Head>
        <title>Investing Basics</title>
        <meta name="description" content="React challenges by ChatGPT" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/assets/favicon.ico" />
      </Head>
    <Layout>
        <section className="investing-section">
          <article className="investing-section__intro">
            <h1>Investing Basics</h1>
            <p>New to investing? You&apos;re in the right place! Explore below to embark on your learning journey towards strategically building wealth! </p>
          </article>
        </section>

        <section className='investing-content'>
          <article className='investing-content__card'>
            <h2>Much like you, your money can age like fine wine too! But first, why invest?</h2>
            <p>Investing doesn&apos;t have to be scary. In fact, what <strong>is</strong> scary is losing out on money that you could be gaining simply by not taking that step towards diversifying where your money is stored.</p>

            <div className='investing-content__card__image'>
              <Image priority={true} src={heroImg} alt="https://www.freepik.com/free-photo/closeup-shot-plant-dollar-banknotes-concept-investments_17463614.htm#query=investing&position=12&from_view=search&track=sphImage by wirestock on Freepik"/>
            </div>

            <p>Losing is scary, there&apos;s no shame in wanting to keep your money safe.</p>
            <p>This is why this page exists! Being strategic with your investments will put you ahead of the curve no matter how early or late you start investing. </p>
            <p>When done right, investing allows you to be more hands off with your money and allows the money to grow in value. Thus, increasing your long term wealth.</p>
          </article>
        </section>

        <ResourceInvest/>

        <section className='visualize-section'>
          <article className='visualize-section__content'>
            <h3>Let&apos;s visualize how one might start out, no matter what age they may be, or amount they start with.</h3>
            <p>Below is a chart you can use to visualize how much your money can grow over the years.</p>
          </article>
          <BarChart/>
        </section>
    </Layout>
    </>
  )
}

export default Investing