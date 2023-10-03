import { FC, useEffect, useState } from "react";
import { Button } from "@mui/material";
import AOS from "aos";
import styles from "./Home.module.scss";
import Header from "../../Components/Header/Header";
import image from "../../../public/images/HomePage.jpg";
import image2 from "../../../public/images/HomePage2.jpg";
import image3 from "../../../public/images/HomePage3.jpg";
import InfoTable from "../InfoTable/InfoTable";
import Programs from "../Programs/Programs";
import Training from "../Training/Training";
import TimeTable from "../TimeTable/TimeTable";
import Trainers from "../Trainers/Trainers";
import Footer from "../../Components/Footer/Footer";
import Loader from "../../Components/Loader/Loader";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import Snack from "../../Components/Snack/Snack";
import { setSnackOpen } from "../../Redux/Slices/appSlice";
import { Link } from "react-router-dom";

const images = [image, image2, image3];

const Home: FC = () => {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [isSnackLoaded, setSnackLoaded] = useState<boolean>(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [nextImageIndex, setNextImageIndex] = useState<number>(1);
  const { isSnackOpen, snackText, snackType } = useAppSelector(
    (state) => state.app
  );
  const dispatch = useAppDispatch();

  const closeSnack = () => {
    dispatch(setSnackOpen());
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setNextImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      setSnackLoaded(true);
    }, 1500);
    AOS.init({
      duration: 400,
      once: true,
    });

    const imageTransition = setInterval(() => {
      setCurrentImageIndex(nextImageIndex);
    }, 2000);

    return () => clearInterval(imageTransition);
  }, [nextImageIndex]);

  return (
    <>
      <Loader isLoading={isLoading} />
      <Header isDark={false} />
      <div className={styles.box}>
        {images.map((img, index) => (
          <img
            key={index}
            className={`${styles.img} ${
              index === currentImageIndex ? styles.show : styles.hide
            }`}
            src={img}
            alt="qwertt"
          />
        ))}

        <div className={styles.content} data-aos="fade-right">
          <h1>Best program for best results</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
          <Link to="/contact-us">
            <Button
              data-aos="fade-up"
              className={styles.button}
              variant="contained"
              sx={{ "&:hover": { boxShadow: "none", transition: "all 0.5s" } }}
            >
              Read more
            </Button>
          </Link>
        </div>
      </div>
      {isSnackLoaded && (
        <Snack
          isOpen={isSnackOpen}
          text={snackText}
          type={snackType}
          onClose={closeSnack}
        />
      )}
      <Programs />
      <InfoTable />
      <Training />
      <TimeTable isFooter={false} isHeader={false} isLoader={false} />
      <Trainers isFooter={false} isHeader={false} isLoader={false} />
      <Footer />
    </>
  );
};

export default Home;
AOS.init();
