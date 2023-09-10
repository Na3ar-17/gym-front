import { FC } from "react";
import styles from "./Pricing.module.scss";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import { Button } from "@mui/material";

const Pricing: FC = () => {
  return (
    <>
      <Header isDark={true} />
      <div className={styles.container}>
        <div className={styles.cards}>
          <div className={styles.card}>
            <div className={styles.content}>
              <p className={styles.package}>Basic package</p>
              <div className={styles.price}>
                <p>$90</p>
                <span>/Mounth</span>
              </div>
              <div className={styles.description}>
                <ol>
                  <li>3 Days per week</li>
                  <li>Functional training</li>
                  <li className={styles.hide}>HIT training</li>
                  <li className={styles.hide}>Open GYM</li>
                  <li className={styles.hide}>Access to videos</li>
                  <li className={styles.hide}>Nutrition program</li>
                </ol>
              </div>
              <Button variant="contained">Purchase Now</Button>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.content}>
              <p className={styles.package}>Advance package</p>
              <div className={styles.price}>
                <p>$149</p>
                <span>/Mounth</span>
              </div>
              <div className={styles.description}>
                <ol>
                  <li>3 Days per week</li>
                  <li>Functional training</li>
                  <li>HIT training</li>
                  <li className={styles.hide}>Open GYM</li>
                  <li className={styles.hide}>Access to videos</li>
                  <li className={styles.hide}>Nutrition program</li>
                </ol>
              </div>
              <Button variant="contained">Purchase Now</Button>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.content}>
              <p className={styles.package}>Premium package</p>
              <div className={styles.price}>
                <p>$225</p>
                <span>/Mounth</span>
              </div>
              <div className={styles.description}>
                <ol>
                  <li>3 Days per week</li>
                  <li>Functional training</li>
                  <li>HIT training</li>
                  <li>Open GYM</li>
                  <li>Access to videos</li>
                  <li>Nutrition program</li>
                </ol>
              </div>
              <Button variant="contained">Purchase Now</Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Pricing;
