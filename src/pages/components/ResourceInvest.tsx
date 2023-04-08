import React from "react";
import Image from "next/image";
import source1 from "../../../public/assets/woman-invest.jpg";
import source2 from "../../../public/assets/stock-chart.jpg";
import source3 from "../../../public/assets/growth-chart.jpg";
import { Navigation, Pagination, EffectCoverflow } from "swiper";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css/bundle";
import Link from "next/link";

function ResourceInvest() {
  return (
    <section className="resources-section">
      <article className="resources-section__content">
        <h3>Expand Your Knowledge on Investing</h3>
        <Swiper
          slidesPerView={1}
          spaceBetween={50}
          loop={true}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          <SwiperSlide>
            <article className="resources-section__content__card">
              <Image
                src={source3}
                alt="https://www.freepik.com/free-vector/startup-managers-presenting-analyzing-sales-growth-chart-group-workers-with-heap-cash-rocket-bar-diagrams-with-arrow-heap-money_12291285.htm#query=illustrations%20invest&position=7&from_view=search&track=ais Image by pch.vector on Freepik"
              />
              <p>
                Financial companies such as banks and investment companies are
                institutions dedicated to providing you these information!
              </p>
              <p>
                To name a few there are: Vanguard, Fidelity, Charles Schwab,
                Bank of America, and Chase. All these companies have all the
                expert financial information you will need to better understand
                your money!
              </p>
            </article>
          </SwiperSlide>

          <SwiperSlide>
            <article className="resources-section__content__card">
              <Image
                src={source1}
                alt="https://www.freepik.com/free-vector/woman-investing-getting-profit_11236054.htm#query=illustrations%20invest&position=5&from_view=search&track=ais Image by pch.vector on Freepik"
              />
              <p>
                You Need A Budget(YNAB) is a finance application that helps you
                track your money and gives personalized steps that helps you
                start your journey towards understanding your finances.
              </p>
              <p>
                Not only is it just an app, it&apos;s also a website that
                provides anyone with a variety of financial resources regarding
                the many sides of finance!
              </p>
              <div className="btn-resources">
                <Link href="https://www.ynab.com/" target="_blank">
                  <button type="button">Learn More</button>
                </Link>
              </div>
            </article>
          </SwiperSlide>

          <SwiperSlide>
            <article className="resources-section__content__card">
              <Image
                src={source2}
                alt="https://www.freepik.com/free-vector/investor-with-laptop-monitoring-growth-dividends-trader-sitting-stack-money-investing-capital-analyzing-profit-graphs-vector-illustration-finance-stock-trading-investment_10173124.htm#query=illustrations%20invest&position=4&from_view=search&track=ais Image by pch.vector on Freepik"
              />
              <p>
                Investopedia focuses on ALL things investing. Any question that
                you may have about investing such as the stock market,
                retirement, or unknown finance terms are all there for your
                consumption!{" "}
              </p>
              <p>
                Having a variety of resources to expand your financial knowledge
                will help you generate more confidence to invest your money!{" "}
              </p>
              <div className="btn-resources">
                <Link
                  href="https://www.investopedia.com/investing-4427685"
                  target="_blank"
                >
                  <button type="button">Learn More</button>
                </Link>
              </div>
            </article>
          </SwiperSlide>
        </Swiper>
      </article>
    </section>
  );
}

export default ResourceInvest;
