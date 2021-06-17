import React from "react";
import styles from "../../../styles/common/ModalComponent.module.css";

const ModalComponent = ({
  icon,
  title,
  description,
  style,
  color,
  borderColor,
  color2,
  borderColor2,
  hoverColor,
  hoverColor2,
  cancel,
  serial,
  btnText2,
  actionBtn,
}) => {
  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.container}>
          <div className={styles.iconContainer}>{icon}</div>
          <div className={styles.modal}>
            <h1 className={styles.header}>
              {title} <span style={{ color: "orangered" }}>{serial}</span>?
            </h1>
            <p className={styles.description}>{description}</p>
            <button onClick={actionBtn} className="btn1">
              {btnText2}
            </button>
            <button onClick={cancel} className="btn2">
              Avbryt
            </button>
          </div>
        </div>
      </div>
      <style jsx>{`
        .btn1 {
          background: transparent;
          border: 1px solid ${borderColor};
          border-radius: 10px;
          padding: 0.4rem 0;
          color: ${color};
          transition: 0.5s;
          grid-row: 9/10;
          grid-column: 7/10;
          width: 5rem;
        }
        .btn1:hover {
          background: ${hoverColor};
          cursor: pointer;
        }
        .btn2 {
          background: transparent;
          border: 1px solid ${borderColor2};
          border-radius: 10px;
          padding: 0.4rem 0;
          color: ${color2};
          transition: 0.5s;
          grid-row: 9/10;
          grid-column: 4/6;
          width: 5rem;
          margin-left: -2rem;
        }
        .btn2:hover {
          background: ${hoverColor2};
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

export default ModalComponent;
