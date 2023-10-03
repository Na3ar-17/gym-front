import { FC, useState, useEffect } from "react";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import styles from "./ContactUs.module.scss";
import StorefrontSharpIcon from "@mui/icons-material/StorefrontSharp";
import HeadphonesSharpIcon from "@mui/icons-material/HeadphonesSharp";
import CreditCardSharpIcon from "@mui/icons-material/CreditCardSharp";
import { Button, Container, TextField } from "@mui/material";
import Loader from "../../Components/Loader/Loader";

const ContactUs: FC = () => {
  const [isLoading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  return (
    <>
      <Loader isLoading={isLoading} />

      <Header isDark={false} />
      <div className={styles.container}>
        <Container>
          <div className={styles.content}>
            <div className={styles.headerBox}>
              <div className={styles.title}>
                <p>GET IN TOUCH</p>
              </div>
              <div className={styles.cards}>
                <div className={styles.card}>
                  <StorefrontSharpIcon className={styles.icon} />
                  <p className={styles.city}>New York</p>
                  <p className={styles.infoText}>
                    45 Grand Ventral Terminal, New York, NY 10017
                  </p>
                  <p className={styles.infoText}>+(00381) 123 456 789</p>
                  <p className={styles.infoText}>
                    Monday – Friday: 07:00 – 22:00
                  </p>
                </div>
                <div className={styles.card}>
                  <HeadphonesSharpIcon className={styles.icon} />
                  <p className={styles.city}>Chicago</p>
                  <p className={styles.infoText}>
                    45 Grand Ventral Terminal, New York, NY 10017
                  </p>
                  <p className={styles.infoText}>+(00381) 123 456 789</p>
                  <p className={styles.infoText}>
                    Monday – Friday: 07:00 – 22:00
                  </p>
                </div>
                <div className={styles.card}>
                  <CreditCardSharpIcon className={styles.icon} />
                  <p className={styles.city}>Los Angeles</p>
                  <p className={styles.infoText}>
                    45 Grand Ventral Terminal, New York, NY 10017
                  </p>
                  <p className={styles.infoText}>+(00381) 123 456 789</p>
                  <p className={styles.infoText}>
                    Monday – Friday: 07:00 – 22:00
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.footerBox}>
              <div className={styles.sides}>
                <div className={styles.contact}>
                  <div className={styles.title}>
                    <p>CONTACT</p>
                  </div>
                  <div className={styles.info}>
                    <p>
                      Lorem ipsum dolor sit amet, conse ctetur adipiscing elit.
                      In augue ligula, feugiat ut consequat. Ut est lacus, mol
                      estee icula ipsum. Nunc faucibus, nisl id dapibus finibus,
                      enim.
                    </p>
                  </div>
                  <div className={styles.list}>
                    <ul>
                      <li>27 Division St, New York, NY 1002, USA</li>
                    </ul>
                    <ul>
                      <li>Monday to Friday: 9am to 8pm</li>
                    </ul>
                    <ul>
                      <li>stamina@qodeinteractive.com</li>
                    </ul>
                    <ul>
                      <li>+381 34 715 700</li>
                    </ul>
                  </div>
                </div>
                <div className={styles.form}>
                  <div className={styles.inputs}>
                    <p className={styles.label}>Your Message</p>
                    <TextField
                      className={styles.input}
                      id="outlined-multiline-static"
                      multiline
                      rows={4}
                    />
                    <p className={styles.label}>Name & Surname</p>
                    <TextField
                      className={styles.input}
                      id="filled-basic"
                      variant="outlined"
                    />
                    <p className={styles.label}>Email </p>
                    <TextField
                      className={styles.input}
                      id="filled-basic"
                      variant="outlined"
                    />
                    <Button className={styles.button} variant="contained">
                      SEND MESSAGE
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;
