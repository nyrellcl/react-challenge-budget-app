import React from 'react'
import Layout from './components/layout'
import Image from 'next/image'
import heroImg from "../../public/pexels-cottonbro-studio-3943716.jpg"

function Investing() {
  return (
    <Layout>
        <section className="investing-section">
          <article className="investing-section__intro">
            <h1>Investing Basics</h1>
            <p>New to investing? You&apos;re in the right place! Explore below to embark on your learning journey towards strategically building wealth! </p>
          </article>
        </section>

        <section className='investing-content'>
          <article className='investing-content__card'>
            <h2>Much like you, your money can age like fine wine too! But, first why invest?</h2>
            <p>Investing doesn&apos;t have to be scary. In fact, what <strong>is</strong> scary is losing out on money that you could be gaining simply by not taking that step towards diversifying where your money is stored.</p>

            <div className='investing-content__card__image'>
              <Image src={heroImg} alt="Person Putting Coin in a Piggy Bank"/>
            </div>

            <p>Losing is scary, there&apos;s no shame in wanting to keep your money safe.</p>
            <p>This is why this page exists! Being strategic with your investments will put you ahead of the curve no matter how early or late you start investing. </p>
            <p>When done right, investing allows you to be more hands off with your money and allows the money to grow in value. Thus, increasing your long term wealth.</p>
          </article>
        </section>
    </Layout>
  )
}

export default Investing