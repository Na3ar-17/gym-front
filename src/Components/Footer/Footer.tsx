import styles from "./Footer.module.scss";
import image1 from "../../../public/images/Light-logo.png";
import { Button } from "@mui/material";
import { Instagram, Twitter, Facebook, YouTube } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { FC } from "react";

const Footer: FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.headerContent}>
            <div className={styles.logo}>
              <a href="#">
                <img src={image1} alt="light-logo" />
              </a>
            </div>
            <div className={styles.footerLink}>
              <Button
                className={styles.button}
                sx={{
                  boxShadow: "none",
                  height: "50px",
                  fontSize: "30px",
                  color: "#fff",
                }}
                variant="contained"
                onClick={() => navigate("/time-table")}
              >
                Start exercising
              </Button>
            </div>
          </div>
          <div className={styles.underLine}></div>
          <div className={styles.footerContent}>
            <div className={styles.contacts}>
              <p className={styles.title}>Contact us</p>
              <p className={styles.email}>hello@example.com</p>
              <p className={styles.phone}>+ 381 123 4567</p>
              <div className={styles.socials}>
                <p>Follow us</p>
                <div className={styles.icons}>
                  <Instagram sx={{ color: "#e6dfdf", cursor: "pointer" }} />
                  <Twitter sx={{ color: "#e6dfdf", cursor: "pointer" }} />
                  <Facebook sx={{ color: "#e6dfdf", cursor: "pointer" }} />
                  <YouTube sx={{ color: "#e6dfdf", cursor: "pointer" }} />
                </div>
              </div>
            </div>
            <div className={styles.info}>
              <div className={styles.locations}>
                <p className={styles.text}>our locations</p>
                <p className={styles.city}>New York</p>
                <p className={styles.addres}>
                  45 Grand Ventral New York, NY 10017
                </p>

                <p className={styles.city}>Los Angeles</p>
                <p className={styles.addres}>
                  10 Port Hueneme Los Angeles, CA 10088
                </p>
              </div>
              <div className={styles.workingHours}>
                <p className={styles.text}>WORKING HOURS</p>
                <p className={styles.days}>Monday - Friday</p>
                <p className={styles.time}>Our doors are open 07:00 - 22:00</p>

                <p className={styles.days}>Weekends</p>
                <p className={styles.time}>Our doors are open 10:00 - 17:00</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
