import React from "react";
import styles from "../../../styles/search/SearchResults.module.css";

const SearchResults = ({ searchResult }) => {
  return (
    <>
      <div className={styles.container}>
        {searchResult &&
          searchResult.data.map((item) => {
            return (
              <div className={styles.resultContainer}>
                <h1 className={styles.header}>{item.serial}</h1>
                <h3 className={styles.type}>{item.type}</h3>
                <p className={styles.registDate}>
                  Registrert: {item.registDate}
                </p>
                <h2 className={styles.retip}>Omloddinger</h2>
                <div className={styles.retipContainer}>
                  <div style={{ display: "inline-block" }}>
                    {item.performer == "" ? (
                      <p style={{ fontWeight: "100", fontStyle: "italic" }}>
                        Ingen omloddinger
                      </p>
                    ) : (
                      item.performer.map((perform) => (
                        <p
                          style={{
                            width: "10rem",
                            fontWeight: "100",
                            fontStyle: "italic",
                          }}
                        >
                          {perform}
                        </p>
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
                      <p>{dat}</p>
                    ))}
                  </div>
                </div>
                <div className={styles.btnContainer}>
                  <button className={styles.btnRetip}>Omlodding</button>
                  <button className={styles.btnDelete}>Slett</button>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default SearchResults;
