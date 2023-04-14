import React from "react";
import Layout from "../components/Layouts/layout";
import Head from "next/head";

function PersonalFinance() {
  return (
    <>
      <Head>
        <title>Personal Finance</title>
        <meta name="description" content="React challenges by ChatGPT" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/assets/favicon.ico" />
      </Head>
      <Layout>
        <section className="personal-finance-section">
          <article className="personal-finance-section__intro">
            <h1>Personal Finance</h1>
            <p>
              Browse below with these personal finance resources that will give
              you an expanded perspective on your money and relationship towards
              maintaining and increasing your wealth.{" "}
            </p>
          </article>
        </section>
      </Layout>
    </>
  );
}

export default PersonalFinance;
