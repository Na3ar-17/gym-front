import React, { FC } from "react";
import styles from "./Quote.module.scss";
import image1 from "../../../public/images/girls.jpg";
import image2 from "../../../public/images/man-on-bike.jpg";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";

const Quote: FC = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <div className={styles.box}>
            <img src={image1} alt="img1" />
          </div>
        </div>
        <div className={styles.rightSide}>
          <div className={styles.box}>
            <img src={image2} alt="img2" />
            <div className={styles.content}>
              <FormatQuoteIcon sx={{ color: "#1976d2", fontSize: "100px" }} />
              <p className={styles.text}>
                My whole life I’ve wanted to be in great shape.
              </p>

              <p className={styles.dev}>DEVELOPER</p>
              <p className={styles.devName}>Bruce Bailey</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Quote;
