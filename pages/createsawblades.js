import React, { useState, useEffect } from "react";
import styles from "../styles/createsawblades/createsawblades.module.css";
import Link from "next/link";
import CreateInputComponent from "../src/components/createsawblades/CreateInputComponent";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
var dateFormat = require("dateformat");
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaArrowLeft } from "react-icons/fa";
import validUsers from "../utils/users";

import ModalComponent from "../src/components/common/ModalComponent";
const api = axios.create({
  baseURL: process.env.api,
});
import { v4 as uuidv4 } from "uuid";
import LoginButton from "../src/components/auth/LoginButton";

const createsawblades = ({
  setUpdate,
  setSelectorValue,
  setSerialInput,
  selectorValue,
  serialInput,
  update,
  addedTodayCount,
  newBladesCurrentMonthType,
  newBladesTodayType,
}) => {
  const { user, isAuthenticated } = useAuth0();
  const [openDeleteModalTodayBlade, setOpenDeleteModalTodayBlade] = useState();
  const [createTodayID, setCreateTodayID] = useState();
  const [uuid, setUuid] = useState();
  const [createTodayListID, setCreateTodayListID] = useState();

  useEffect(() => {
    setUuid(uuidv4());
  }, [update]);

  const createNewBladeHandler = (e) => {
    if (
      serialInput === "" ||
      serialInput === undefined ||
      selectorValue === "" ||
      selectorValue === undefined
    ) {
      alert("Du må fylle ut bladtype og serienummer!");
    } else {
      api
        .post(`/api/newblades/createNewBlade/?user=${user.sub}`, {
          type: selectorValue,
          serial: serialInput,
          updated: new Date(),
          newid: uuid,
        })
        .then(function (response) {
          if (response.status === 200) {
            createNewBladeListHandler();
            setUpdate(Math.random());
          }
        });
    }
  };
  const onSubmit = (e) => {
    if (e.code === "Enter") {
      createNewBladeHandler();
    }
  };

  const createNewBladeListHandler = () => {
    api
      .post(`/api/newblades/createNewBladeList/?user=${user.sub}`, {
        type: selectorValue,
        serial: serialInput,
        updated: new Date(),
        newid: uuid,
      })
      .then(function (response) {
        if (response.status === 200) {
          setUpdate(Math.random());
        }
      });
  };

  const deleteNewBladesTodayHandler = () => {
    try {
      api
        .delete(
          `/api/delete/deleteblade/?del=${createTodayID}&user=${user.sub}`
        )

        .then((res) => {
          if (res.status === 200) {
            deleteBladeOnList();
            setOpenDeleteModalTodayBlade(false);
            setUpdate(Math.random());
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
  const deleteBladeOnList = () => {
    try {
      api
        .delete(
          `/api/delete/deletebladetoday/?del=${createTodayID}&user=${user.sub}`
        )
        .then((res) => {
          if (res.status === 200) {
            setUpdate(Math.random());
          }
        });
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
    <>
      {user && user.sub === validUsers ? (
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
                onSubmit={onSubmit}
              />
            </div>

            <p className={styles.bladeviewHeader}>
              Lagt til denne måneden:{" "}
              {newBladesOnList && newBladesOnList.length}
            </p>

            <h4 className={styles.typeCountHeader}>Bladtyper denne måneden:</h4>
            <div>
              {newBladesCurrentMonthType &&
                newBladesCurrentMonthType.data.map((item) => (
                  <div className={styles.typeCountContainer}>
                    {" "}
                    <p className={styles.count}>{item.typeCount}</p>
                    <p className={styles.inputText}>{item._id.type}</p>
                  </div>
                ))}
            </div>

            <p className={styles.bladeviewHeader}>
              Lagt til i dag:{" "}
              {addedTodayCount &&
                addedTodayCount.data.map((item) => item.countDay)}
            </p>
            <h4 className={styles.typeCountHeader}>Bladtyper i dag:</h4>
            {newBladesTodayType &&
              newBladesTodayType.data.map((item) => (
                <div className={styles.typeCountContainer}>
                  {" "}
                  <p className={styles.count}>{item.typeCount}</p>
                  <p className={styles.inputText}>{item._id.type}</p>
                </div>
              ))}
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
      ) : (
        <div
          style={{ padding: "2rem", background: "black", minHeight: "100vh" }}
        >
          <h1 style={{ margin: "1rem 0", color: "orangered" }}>
            Du er ikke inlogget
          </h1>
          <LoginButton />
        </div>
      )}
    </>
  );
};

export default createsawblades;
