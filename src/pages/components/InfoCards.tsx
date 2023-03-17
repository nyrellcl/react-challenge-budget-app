import React, { useState } from "react";
import data from "../../data.json";
import {DM_Sans} from 'next/font/google'


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
            {/*eslint-disable-next-line @next/next/no-img-element*/}
            <img src={item.img} alt={item.title} />
            <h2>{item.title}</h2>
            <button className="info-btn" type="button" onClick={() => handleInfo(itemIndex)}>
              More Info
            </button>
            {cardStates[itemIndex] && (
              <article className="info__container__card__content">
                
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
              </article>
            )}
          </div>
        ))}
      </article>
    </section>
    </>
  );
}

export default InfoCards;
