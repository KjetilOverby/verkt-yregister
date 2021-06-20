import React, { useState, useEffect } from "react";
import styles from "../styles/createsawblades/createsawblades.module.css";
import Link from "next/link";
import CreateInputComponent from "../src/components/createsawblades/CreateInputComponent";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
var dateFormat = require("dateformat");
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaArrowLeft } from "react-icons/fa";

import ModalComponent from "../src/components/common/ModalComponent";
const api = axios.create({
  baseURL: process.env.api,
});
import { v4 as uuidv4 } from "uuid";

const createsawblades = ({
  setGetTodayCreatedBladeID,
  setUpdate,
  setSelectorValue,
  setSerialInput,
  selectorValue,
  serialInput,
  newBladesToday,
  update,
}) => {
  const { user, isAuthenticated } = useAuth0();
  const [openDeleteModalTodayBlade, setOpenDeleteModalTodayBlade] = useState();
  const [createTodayID, setCreateTodayID] = useState();
  const [uuid, setUuid] = useState();
  const [createTodayListID, setCreateTodayListID] = useState();

  useEffect(() => {
    setUuid(uuidv4());
  }, [update]);

  const createNewBladeHandler = () => {
    api
      .post(`/api/newblades/createNewBlade/?user=${user.sub}`, {
        type: selectorValue,
        serial: serialInput,
        updated: new Date(),
        newid: uuid,
      })
      .then(function (response) {});
    createNewBladeListHandler();
    setTimeout(() => {
      setUpdate(Math.random());
    }, 1000);
  };
  const createNewBladeListHandler = () => {
    api
      .post(`/api/newblades/createNewBladeList/?user=${user.sub}`, {
        type: selectorValue,
        serial: serialInput,
        updated: new Date(),
        newid: uuid,
      })
      .then(function (response) {});

    setTimeout(() => {
      setUpdate(Math.random());
    }, 1000);
  };

  const deleteNewBladesTodayHandler = () => {
    try {
      api
        .delete(
          `/api/delete/deleteblade/?del=${createTodayID}&user=${user.sub}`
        )

        .then((res) => {});
    } catch (error) {
      console.log(error);
    }
    deleteBladeOnList();
    setOpenDeleteModalTodayBlade(false);
    setTimeout(() => {
      setUpdate(Math.random());
    }, 1000);
  };
  const deleteBladeOnList = () => {
    try {
      api
        .delete(
          `/api/delete/deletebladetoday/?del=${createTodayID}&user=${user.sub}`
        )
        .then((res) => {});
    } catch (error) {
      console.log(error);
    }
  };

  const [serialBladeToday, setSerialBladeToday] = useState();

  const [newBladesOnList, setNewBladesOnList] = useState();
  useEffect(() => {
    try {
      api.get(`/api/newblades/newBladesListToday`).then((res) => {
        setNewBladesOnList(res.data.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [update]);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.leftContainer}>
        <Link href="/">
          <button className={styles.btn}>
            <FaArrowLeft className={styles.icon} /> Tilbake
          </button>
        </Link>
        <div>
          <CreateInputComponent
            createNewBladeHandler={createNewBladeHandler}
            setSelectorValue={setSelectorValue}
            setSerialInput={setSerialInput}
          />
        </div>
      </div>
      <div className={styles.rightContainer}>
        <h1 className={styles.header}>Legg til nye sagblad</h1>
        {newBladesOnList &&
          newBladesOnList.map((item) => {
            const openDeleteModalHandler = () => {
              setOpenDeleteModalTodayBlade(true);
              setSerialBladeToday(item.serial);
              setCreateTodayID(item.newid);
            };

            return (
              <div
                className={styles.newBladeContainer}
                onClick={openDeleteModalHandler}
              >
                <RiDeleteBin5Line className={styles.deleteButton} />
                <p className={styles.serial}>{item.serial}</p>
                <p className={styles.type}>{item.type}</p>
                <p className={styles.pTag}>
                  {dateFormat(item.updated, "dd.mm.yyyy")}
                </p>
              </div>
            );
          })}
        {/* {newBladesOnList &&
          newBladesOnList.map((id) => {
            const getListTodayID = () => {
              setCreateTodayListID(id._id);
            };
            return (
              <div className={styles.b} onClick={getListTodayID}>
                <p style={{ color: "white" }}>{id.serial}</p>
              </div>
            );
          })} */}
      </div>
      {openDeleteModalTodayBlade && (
        <ModalComponent
          title="Slette"
          description="Slettingen er permanent og kan ikke angres"
          color="red"
          borderColor="red"
          hoverColor="#d640402b"
          cancel={() => setOpenDeleteModalTodayBlade(false)}
          btnText2="Slett"
          serial={serialBladeToday}
          actionBtn={deleteNewBladesTodayHandler}
        />
      )}
    </div>
  );
};

export default createsawblades;
