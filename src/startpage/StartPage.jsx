import React, { useState } from "react";
import styles from "../../styles/startpage/StartPage.module.css";
import StartPageCards from "./StartPageCards";
import Link from "next/link";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BsArrowRepeat } from "react-icons/bs";
import { BiAddToQueue } from "react-icons/bi";
import { useAuth0 } from "@auth0/auth0-react";

import HeaderComponent from "../components/common/HeaderComponent";
import SearchResults from "../components/search/SearchResults";

function StartPage({
  wasteCountTypeThisYear,
  wasteThisYear,
  wasteCountCurrentMonth,
  wasteCountCurrentMonthType,
  servicecountCurrentYear,
  servicecountCurrentYearType,
  serviceCountCurrentMonth,
  serviceCountCurrentMonthType,
  newbladesCount,
  newbladesCountType,
  newbladesCountCurrentMonth,
  newBladesCurrentMonthType,
  setInput,
  searchResult,
  openSearchResults,
  setOpenSearchResults,
  input,
}) {
  const { user, isAuthenticated } = useAuth0();
  return (
    <div className={styles.mainContainer}>
      <div className={styles.container}>
        <div className={styles.imgContainer}></div>
        <HeaderComponent
          setInput={setInput}
          setOpenSearchResults={setOpenSearchResults}
          input={input}
          openSearchResults={openSearchResults}
        />
        {openSearchResults && <SearchResults searchResult={searchResult} />}
        <div className={styles.textContainer}>
          <h1 className={styles.headerText}>Sagbladregister</h1>
          <p className={styles.subText}>Sliperi Moelven Våler • MKV - VS66</p>
          <Link href="https://moelvensagbladregister.vercel.app/homepage">
            <button className={styles.btn}>Oversikt</button>
          </Link>
        </div>
        <div className={styles.cardContainer}>
          <StartPageCards
            title="Vrak"
            color="waste"
            countCurrentYear={wasteCountTypeThisYear}
            countYear={wasteThisYear}
            countMonth={wasteCountCurrentMonth}
            countMonthType={wasteCountCurrentMonthType}
            icon={<RiDeleteBin6Line className={styles.icon} />}
          />
          <StartPageCards
            title="Service"
            color="service"
            countYear={servicecountCurrentYear}
            countCurrentYear={servicecountCurrentYearType}
            countMonth={serviceCountCurrentMonth}
            countMonthType={serviceCountCurrentMonthType}
            icon={<BsArrowRepeat className={styles.icon} />}
          />
          <StartPageCards
            countYear={newbladesCount}
            title="Nye blad"
            color="new"
            countCurrentYear={newbladesCountType}
            countMonth={newbladesCountCurrentMonth}
            countMonthType={newBladesCurrentMonthType}
            icon={<BiAddToQueue className={styles.icon} />}
          />
        </div>
      </div>

      <div className={styles.footer}>
        <p>Verktøyregister • Moelven våler • © 2021</p>
      </div>
    </div>
  );
}

export default StartPage;
