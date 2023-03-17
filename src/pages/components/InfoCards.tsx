import React, { useState } from "react";
import data from "../../data.json";
import {DM_Sans} from 'next/font/google'
import { faMoneyBillTrendUp } from "@fortawesome/free-solid-svg-icons";

const dmSans = DM_Sans({subsets: ['latin'],
weight: ['400', '500', '700']})



function InfoCards() {
  const [cardStates, setCardStates] = useState<boolean[]>(
    data.content.map(() => false)
  );

  const handleInfo = (index: number) => {
    setCardStates(cardStates.map((state, i) => (i === index ? !state : state)));
  };

  return (
    <>
    <style jsx global>{` html{
            font-family: ${dmSans.style.fontFamily}
        `}
    </style>

    <section className="info">
      <article className="info__container">
        {data.content.map((item, itemIndex) => (
          <div key={itemIndex} className="info__container__card">
            <h2>{item.title}</h2>
            <button className="info-btn" type="button" onClick={() => handleInfo(itemIndex)}>
              More Info
            </button>
            {cardStates[itemIndex] && (
              <>
                <p>{item.description}</p>
                <ul className="info__container__card__sources">
                  {item.sources.map((source, sourceIndex) => (
                    <li key={sourceIndex}>
                      <a href={source.url} target="_blank">
                        {source.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        ))}
      </article>
    </section>
    </>
  );
}

export default InfoCards;
