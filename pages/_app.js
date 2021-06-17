import "../styles/globals.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Auth0Provider } from "@auth0/auth0-react";
import { useAuth0 } from "@auth0/auth0-react";

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

const api = axios.create({
  baseURL: process.env.api,
});

function MyApp({ Component, pageProps }) {
  const [getID, setGetID] = useState();
  const [openSearchResults, setOpenSearchResults] = useState(false);
  const [wasteThisYear, setWasteThisYear] = useState();
  const [wasteCountTypeThisYear, setWasteCountTypeThisYear] = useState();
  const [update, setUpdate] = useState();
  // const [wasteCountCurrentMonth, setWasteCountCurrentMonth] = useState();
  const [wasteCountCurrentMonthType, setWasteCountCurrentMonthType] =
    useState();

  useEffect(() => {
    try {
      api.get(`/api/wastecount/wastecountType`).then((res) => {
        setWasteCountTypeThisYear(res.data.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [update]);
  useEffect(() => {
    try {
      api.get(`/api/wastecount/wastecountThisYear`).then((res) => {
        setWasteThisYear(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [update]);
  // useEffect(() => {
  //   try {
  //     api
  //       .get(`/api/wastecount/wastecountCurrentMonth?test=test`)
  //       .then((res) => {
  //         setWasteCountCurrentMonth(res.data);
  //       });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, []);
  useEffect(() => {
    try {
      api.get(`/api/wastecount/wasteCountCurrentMonthType`).then((res) => {
        setWasteCountCurrentMonthType(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [update]);
  // Service Count
  const [servicecountCurrentYear, setServicecountCurrentYear] = useState();
  const [servicecountCurrentYearType, setServicecountCurrentYearType] =
    useState();
  const [serviceCountCurrentMonth, setServiceCountCurrentMonth] = useState();
  const [serviceCountCurrentMonthType, setServiceCountCurrentMonthType] =
    useState();
  useEffect(() => {
    try {
      api.get(`/api/servicecount/serviceCountCurrentYear`).then((res) => {
        setServicecountCurrentYear(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [update]);
  useEffect(() => {
    try {
      api.get(`/api/servicecount/serviceCountYearType`).then((res) => {
        setServicecountCurrentYearType(res.data.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [update]);
  useEffect(() => {
    try {
      api.get(`/api/servicecount/serviceCountCurrentMonth`).then((res) => {
        setServiceCountCurrentMonth(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [update]);
  useEffect(() => {
    try {
      api.get(`/api/servicecount/serviceCountCurrentMonthType`).then((res) => {
        setServiceCountCurrentMonthType(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [update]);

  // New blades
  const [newbladesCount, setNewbladesCount] = useState();
  const [newbladesCountType, setNewbladesCountType] = useState();
  const [newbladesCountCurrentMonth, setNewbladesCountCurrentMonth] =
    useState();
  const [newBladesCurrentMonthType, setNewBladesCurrentMonthType] = useState();
  useEffect(() => {
    try {
      api.get(`/api/newblades/newBladesCurrentYear`).then((res) => {
        setNewbladesCount(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [update]);
  useEffect(() => {
    try {
      api.get(`/api/newblades/newbladesCurrentYearType`).then((res) => {
        setNewbladesCountType(res.data.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [update]);
  useEffect(() => {
    try {
      api.get(`/api/newblades/newbladesCountCurrentMonth`).then((res) => {
        setNewbladesCountCurrentMonth(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [update]);
  useEffect(() => {
    try {
      api.get(`/api/newblades/newbladesCurrentMonthType`).then((res) => {
        setNewBladesCurrentMonthType(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [update]);
  // SEARCH
  const [searchResult, setSearchResult] = useState();
  const [input, setInput] = useState();
  console.log(searchResult);
  useEffect(() => {
    try {
      api.get(`/api/search/querysearch?userquery=${input}`).then((res) => {
        setSearchResult(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [input, update]);

  useEffect(() => {
    if (input) {
      setOpenSearchResults(true);
    }
  }, [input]);

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={typeof window !== "undefined" && window.location.origin}
    >
      <Component
        {...pageProps}
        wasteCountTypeThisYear={wasteCountTypeThisYear}
        wasteThisYear={wasteThisYear}
        //wasteCountCurrentMonth={wasteCountCurrentMonth}
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
        getID={getID}
        setUpdate={setUpdate}
        update={update}
      />
    </Auth0Provider>
  );
}

export default MyApp;
