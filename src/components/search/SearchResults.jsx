import React, { useState, useEffect } from "react";
import styles from "../../../styles/search/SearchResults.module.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BsArrowRepeat } from "react-icons/bs";
import { FaComments } from "react-icons/fa";
import ModalComponent from "../common/ModalComponent";
var dateFormat = require("dateformat");
import { RiDeleteBin5Line } from "react-icons/ri";
import { GiRapidshareArrow } from "react-icons/gi";
import { GiTrashCan } from "react-icons/gi";

const SearchResults = ({
  searchResult,
  setGetID,
  deleteBladeHandler,
  setOpenDeleteModal,
  openDeleteModal,
  setGetType,
  setGetSerial,
  setGetNumberOfRetip,
  createServiceBladeHandler,
  setOpenRetipModal,
  openRetipModal,
  retipUpdateHandler,
}) => {
  const [serial, setSerial] = useState();

  return (
    <>
      <div className={styles.container}>
        {searchResult &&
          searchResult.data.map((item) => {
            const OpenDeleteModalHandler = () => {
              setSerial(item.serial);
              setGetID(item._id);
              setGetType(item.type);
              setOpenDeleteModal(true);
              setGetSerial(item.serial);
              setGetNumberOfRetip(item.performer.length);
            };
            const openRetipModalHandler = () => {
              setOpenRetipModal(true);
              setGetID(item._id);
              setGetSerial(item.serial);
              setGetType(item.type);
              setSerial(item.serial);
            };
            return (
              <div className={`${styles.resultContainer} moveBack`}>
                <div className={styles.serialDotContainer}>
                  <h1 className={styles.header}>{item.serial}</h1>
                  <div className="dotFirstContainer">
                    {item.performer.length <= 1 && (
                      <div className="dot dot1">{item.performer.length}</div>
                    )}
                    {item.performer.length === 2 && (
                      <div className="dot dot2">{item.performer.length}</div>
                    )}
                    {item.performer.length > 2 && (
                      <div className="dot dot3">{item.performer.length}</div>
                    )}
                  </div>
                </div>

                <h3 className={styles.type}>{item.type}</h3>
                <p className={styles.registDate}>
                  Registrert:{" "}
                  {item.registDate || dateFormat(item.updated, "dd.mm.yyyy")}
                </p>
                <h2 className={styles.retip}>Omloddinger</h2>
                <hr />
                <div className={styles.retipContainer}>
                  <div style={{ display: "inline-block" }}>
                    {item.performer == "" ? (
                      <p className={styles.retipText}>Ingen omloddinger</p>
                    ) : (
                      item.performer.map((perform) => (
                        <p className={styles.retipText}>{perform}</p>
                      ))
                    )}
                  </div>
                  <div
                    style={{
                      display: "inline-block",
                      fontWeight: "100",
                      fontStyle: "italic",
                    }}
                  >
                    {item.date.map((dat) => (
                      <p className={styles.retipText}>{dat}</p>
                    ))}
                  </div>
                </div>
                <h2 className={styles.retip}>Kommentarer</h2>
                <hr />

                <div className={styles.retipContainer}>
                  <div style={{ display: "inline-block" }}>
                    {item.comment == "" ? (
                      <p className={styles.commentText}>Ingen Kommentarer</p>
                    ) : (
                      item.comment.map((comments) => (
                        <p className={styles.commentText}>{comments}</p>
                      ))
                    )}
                  </div>
                  <div className={styles.commentText}>
                    {item.commentDate.map((date) => (
                      <p className={styles.commentText}>{date}</p>
                    ))}
                  </div>
                </div>

                <div className={styles.btnContainer}>
                  <div
                    onClick={OpenDeleteModalHandler}
                    className={`${styles.iconContainer} ${styles.deleteBtnContainer}`}
                  >
                    <RiDeleteBin6Line />
                  </div>
                  <div
                    className={`${styles.iconContainer} ${styles.commentBtnContainer}`}
                  >
                    <FaComments />
                  </div>
                  <div
                    onClick={openRetipModalHandler}
                    className={`${styles.iconContainer} ${styles.retipBtnContainer}`}
                  >
                    <BsArrowRepeat />
                  </div>
                </div>
              </div>
            );
          })}
        {openDeleteModal && (
          <ModalComponent
            title="Slette "
            description="Slettingen er permanent og kan ikke angres"
            style="deleteBtn"
            color="red"
            borderColor="red"
            hoverColor="#d640402b"
            icon={<GiTrashCan style={{ color: "red", fontSize: "2.5rem" }} />}
            color2="blue"
            borderColor2="blue"
            cancel={() => setOpenDeleteModal(false)}
            serial={serial}
            btnText2="Slett"
            actionBtn={deleteBladeHandler}
          />
        )}
        {openRetipModal && (
          <ModalComponent
            title="Oppdatere "
            description="Legg til omlodding fra Stridsbergs."
            style="deleteBtn"
            color="#3e7cb6"
            borderColor="#3e7cb6"
            hoverColor="#4086d62b"
            btnText2="Slett"
            icon={
              <GiRapidshareArrow style={{ color: "blue", fontSize: "2rem" }} />
            }
            color2="#333"
            borderColor2="#333"
            cancel={() => setOpenRetipModal(false)}
            serial={serial}
            btnText2="Oppdater"
            actionBtn={retipUpdateHandler}
          />
        )}
      </div>
      <style jsx>{`
        .dot {
          height: 2rem;
          width: 2rem;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .dotFirstContainer {
          height: 2.5rem;
          width: 2.5rem;
          border: 1px solid white;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 50%;
        }
        .dot1 {
          background: #58b658;
        }
        .dot2 {
          background: #ecdd56;
        }
        .dot3 {
          height: 2rem;
          width: 2rem;
          background: #ec1a1a;
          border-radius: 50%;
          justify-content: center;
          align-items: center;
        }
        .moveBack {
          animation-name: moveBack;
          animation-duration: 1.5s;
        }
      `}</style>
    </>
  );
};

export default SearchResults;
