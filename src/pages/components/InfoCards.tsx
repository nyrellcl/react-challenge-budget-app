import React, { useState } from "react";
import data from "../../data.json";
import intro from "../../../public/illustration-intro.svg"
import Image from "next/image";





function InfoCards() {
  const [cardStates, setCardStates] = useState<boolean[]>(
    data.content.map(() => false)
  );

  const handleInfo = (index: number) => {
    setCardStates(cardStates.map((state, i) => (i === index ? !state : state)));
  };

  return (
    <>
    
    <section className="intro">
      <div className="intro__img-container">
    <Image className="intro__img-container__image" src={intro} alt="intro illustration"/>

      </div>
      <article className="intro__content">
      <h1>Look at your money differently</h1>
    <p>Learn more about how to take control of your money and increase your knowledge to make your money work for you.</p>
      </article>
      
    </section>
    

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
