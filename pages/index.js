import Head from "next/head";
import StartPage from "../src/startpage/StartPage";
import styles from "../styles/Home.module.css";
import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import validUsers from "../utils/users";
var dateFormat = require("dateformat");
const api = axios.create({
  baseURL: process.env.api,
});

export default function Home({
  wasteCountTypeThisYear,
  wasteThisYear,
  //wasteCountCurrentMonth,
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
  setGetID,
  getID,
  setUpdate,
  update,
  serialInput,
  selectorValue
  
}) {
  const { user, isAuthenticated } = useAuth0();
  const [wasteCountCurrentMonth, setWasteCountCurrentMonth] = useState();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [getType, setGetType] = useState();
  const [getSerial, setGetSerial] = useState();
  const [getNumberOfRetip, setGetNumberOfRetip] = useState();
  const [getTodayCreatedBladeID, setGetTodayCreatedBladeID] = useState()
  
  

  
  useEffect(() => {
    try {
      api
        .get(`/api/wastecount/wastecountCurrentMonth?test=${user.sub}`)
        .then((res) => {
          setWasteCountCurrentMonth(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, [user]);

  // DELETE

  const deleteBladeHandler = () => {
    try {
      api
        .delete(`/api/delete/deleteblade/?del=${getID}&user=${user.sub}`)
        .then((res) => {});
    } catch (error) {
      console.log(error);
    }
    createDeletedBladeHandler();
    setOpenDeleteModal(false);
    setTimeout(() => {
      setUpdate(Math.random());
    }, 1000);
  };

  const createDeletedBladeHandler = () => {
    api
      .post(`/api/delete/createDeletedBlade/?user=${user.sub}`, {
        type: getType,
        serial: getSerial,
        wasteNumberOfRetip: getNumberOfRetip,
        wasteDate: new Date(),
      })
      .then(function (response) {});
  };

  // Service
  const [openRetipModal, setOpenRetipModal] = useState(false);
  const createServiceBladeHandler = () => {
    api
      .post(`/api/service/createserviceBlade/?user=${user.sub}`, {
        type: getType,
        serial: getSerial,
        serviceDate: new Date(),
      })
      .then(function (response) {});
  };

  const retipUpdateHandler = () => {
    api.post(`/api/service/updateretip/?ids=${getID}&user=${user.sub}`, {
      performer: "Stridsbergs",
      date: dateFormat(new Date(), "dd.mm.yyyy"),
    });

    createServiceBladeHandler();
    setOpenRetipModal(false);
    setTimeout(() => {
      setUpdate(Math.random());
    }, 1000);
  };



  return (
    <div className={styles.container}>
      <Head>
        <title>Moelven Våler | Verktøyregister</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <StartPage
        wasteCountTypeThisYear={wasteCountTypeThisYear}
        wasteThisYear={wasteThisYear}
        wasteCountCurrentMonth={wasteCountCurrentMonth}
        wasteCountCurrentMonthType={wasteCountCurrentMonthType}
        servicecountCurrentYear={servicecountCurrentYear}
        servicecountCurrentYearType={servicecountCurrentYearType}
        serviceCountCurrentMonth={serviceCountCurrentMonth}
        serviceCountCurrentMonthType={serviceCountCurrentMonthType}
        newbladesCount={newbladesCount}
        newbladesCountType={newbladesCountType}
        newbladesCountCurrentMonth={newbladesCountCurrentMonth}
        newBladesCurrentMonthType={newBladesCurrentMonthType}
        setInput={setInput}
        searchResult={searchResult}
        openSearchResults={openSearchResults}
        setOpenSearchResults={setOpenSearchResults}
        input={input}
        setGetID={setGetID}
        deleteBladeHandler={deleteBladeHandler}
        setOpenDeleteModal={setOpenDeleteModal}
        openDeleteModal={openDeleteModal}
        createDeletedBladeHandler={createDeletedBladeHandler}
        setGetType={setGetType}
        setGetSerial={setGetSerial}
        setGetNumberOfRetip={setGetNumberOfRetip}
        createServiceBladeHandler={createServiceBladeHandler}
        setOpenRetipModal={setOpenRetipModal}
        openRetipModal={openRetipModal}
        retipUpdateHandler={retipUpdateHandler}
        setGetTodayCreatedBladeID={setGetTodayCreatedBladeID}
      
      />
    </div>
  );
}
