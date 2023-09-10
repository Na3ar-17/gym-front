import { FC } from "react";
import styles from "./InfoTable.module.scss";
import { Container } from "@mui/material";

const InfoTable: FC = () => {
  return (
    <>
      <div className={styles.container}>
        <Container>
          <div className={styles.table}>
            <div className={styles.box}>
              <p className={styles.number}>8</p>
              <p className={styles.text}>YEARS OF EXPERIENCE</p>
            </div>
            <div className={styles.box}>
              <p className={styles.number}>16</p>
              <p className={styles.text}>SKILLED TRAINER</p>
            </div>
            <div className={styles.box}>
              <p className={styles.number}>64K</p>
              <p className={styles.text}>CALORIES BURNED</p>
            </div>
            <div className={styles.box}>
              <p className={styles.number}>256</p>
              <p className={styles.text}>HAPPY MEMBERS</p>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default InfoTable;
