import React from "react";
import styles from "./Test.module.scss";
import { imgLink } from "../../links";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const Test: React.FC = () => {
  // img, category, name, price, id
  return (
    <>
      <div className={styles.card}>
        <div className={styles.content}>
          <div className={styles.image}>
            <img src={imgLink + "DesignerWaterBottle.png"} alt="imgTest" />
          </div>
          <div className={styles.utils}>
            <div className={styles.cardName}>
              <p className={styles.name}>Bottle</p>
              <p className={styles.category}>Casual</p>
            </div>
            <div className={styles.buyInfo}>
              <p className={styles.price}>$125</p>
              <ShoppingCartIcon className={styles.buyIcon} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Test;
