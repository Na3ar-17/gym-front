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
import { useAppSelector } from "../../hooks/hooks";
import { selectIsAuth } from "../../Redux/Slices/authSlice";
import Loader from "../../Components/Loader/Loader";

const images = [image, image2, image3];

const Home: FC = () => {
  const isAuth = useAppSelector((state) => selectIsAuth(state));

  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [nextImageIndex, setNextImageIndex] = useState<number>(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setNextImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
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
          <Button
            data-aos="fade-up"
            className={styles.button}
            variant="contained"
            sx={{ "&:hover": { boxShadow: "none", transition: "all 0.5s" } }}
          >
            Read more
          </Button>
        </div>
      </div>
      <Programs />
      <InfoTable />
      <Training />
      <TimeTable />
      <Trainers />
      <Footer />
    </>
  );
};

export default Home;
AOS.init();
