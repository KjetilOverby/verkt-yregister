import React, { useState } from "react";
import styles from "../../../styles/common/HeaderComponent.module.css";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../auth/LoginButton";
import Logout from "../auth/Logout";
import validUsers from "../../../utils/users";

const HeaderComponent = ({
  input,
  setInput,
  setOpenSearchResults,
  openSearchResults,
}) => {
  const { user, isAuthenticated } = useAuth0();
  const [test, setTest] = useState();
  console.log(test);
  const getSearchHandler = (e) => {
    setInput(e.target.value);
  };

  const closeSearchResultsHandler = () => {
    setOpenSearchResults(false);
    setInput("");
  };
  return (
    <div className={styles.header}>
      <div className={styles.logoMenuContainer}>
        <img
          className={styles.logo}
          src="https://coop.no/globalassets/coop-obs-bygg/brands/moelven/moelven_logo.blaa.png"
          alt=""
        />
        {user && user.sub === validUsers && (
          <div className={styles.menuContainer}>
            <input
              className={styles.input}
              placeholder="Søk i sagblad"
              onChange={getSearchHandler}
              value={input}
            />
            {openSearchResults && (
              <p
                className={styles.closeButton}
                onClick={closeSearchResultsHandler}
              >
                Lukk søkeresultater
              </p>
            )}
            <p className={styles.tab}>Legg til sagblad</p>
          </div>
        )}
      </div>

      <LoginButton />
      <Logout />
    </div>
  );
};

export default HeaderComponent;