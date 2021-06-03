import React, { useState } from "react";
import styles from "../../styles/startpage/StartPageCards.module.css";

function StartPageCards({
  title,
  color,
  countCurrentYear,
  countYear,
  countMonth,
  countMonthType,
  icon,
}) {
  return (
    <>
      <div className={`${styles.container} ${color}`}>
        <h1 className={styles.title}>
          {icon}
          {title}
        </h1>
        <h4>
          Denne måneden (
          {countMonth && countMonth.data.map((item) => item.countMonth)})
        </h4>
        <hr className={styles.hr} />
        {countMonthType &&
          countMonthType.data.map((item) => {
            return (
              <div className={styles.typeCountContainer}>
                <p className={styles.pTag}>{item._id.type}</p>
                <p className={styles.pTag}>{item.typeCount}</p>
              </div>
            );
          })}
        <h4>
          Dette året (
          {countYear && countYear.data.map((item) => item.countYear)})
        </h4>

        <hr className={styles.hr} />
        {countCurrentYear &&
          countCurrentYear.map((item) => {
            return (
              <div className={styles.typeCountContainer}>
                <p className={styles.pTag}>{item._id.type}</p>
                <p className={styles.pTag}>{item.typeCount}</p>
              </div>
            );
          })}
      </div>
      <style jsx>{`
        .new {
          background-image: linear-gradient(-225deg, #aff1ee 0%, #cdfea5 100%);
          color: #13746f;
        }
        .service {
          background-image: linear-gradient(to right, #94ddf0 0%, #979fe7 100%);
          color: #292f68;
        }
        .waste {
          background-image: linear-gradient(-45deg, #f1cdad 0%, #eea3b8 100%);
          color: #742239;
        }
      `}</style>
    </>
  );
}

export default StartPageCards;
