import { FC, useState } from "react";
import styles from "./Training.module.scss";
import image1 from "../../../public/images/training1.jpg";
import image2 from "../../../public/images/training2.jpg";
import image3 from "../../../public/images/training3.jpg";
import image4 from "../../../public/images/training4.jpg";
import { Button } from "@mui/material";
import ModalWindow from "../../Components/ModalWindow/ModalWindow";

const Training: FC = () => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const closeModal = () => {
    setModalOpen(false);
  };

  const openModal = () => {
    setModalOpen(true);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.table}>
          <div className={styles.box}>
            <div className={styles.content}>
              <p>Training</p>
              <p className={styles.title}>Training plan</p>
              <p className={styles.body}>
                Lorem ipsum dolor sit amet, consec tetur adipi scing elit.
                Quisque eget augue ante, sed bibend umigula.
              </p>
              <Button
                onClick={() => openModal()}
                sx={{ width: "122px" }}
                variant="outlined"
              >
                Read more
              </Button>
            </div>
          </div>

          <div className={styles.imgBox}>
            <img src={image1} alt="img1" />
          </div>
          <div className={styles.box}>
            <div className={styles.content}>
              <p>Training</p>
              <p className={styles.title}>Training plan</p>
              <p className={styles.body}>
                Lorem ipsum dolor sit amet, consec tetur adipi scing elit.
                Quisque eget augue ante, sed bibend umigula.
              </p>
              <Button
                onClick={() => openModal()}
                sx={{ width: "122px" }}
                variant="outlined"
              >
                Read more
              </Button>
            </div>
          </div>
          <div className={styles.imgBox}>
            <img src={image2} alt="img1" />
          </div>
          <div style={{ display: "flex" }} className={styles.flexReverse}>
            <div id="test" className={styles.imgBox}>
              <img src={image3} alt="img1" />
            </div>
            <div className={styles.box}>
              <div className={styles.content}>
                <p>Training</p>
                <p className={styles.title}>Training plan</p>
                <p className={styles.body}>
                  Lorem ipsum dolor sit amet, consec tetur adipi scing elit.
                  Quisque eget augue ante, sed bibend umigula.
                </p>
                <Button
                  onClick={() => openModal()}
                  sx={{ width: "122px" }}
                  variant="outlined"
                >
                  Read more
                </Button>
              </div>
            </div>
            <div className={styles.imgBox}>
              <img src={image4} alt="img1" />
            </div>
            <div className={styles.box}>
              <div className={styles.content}>
                <p>Training</p>
                <p className={styles.title}>Training plan</p>
                <p className={styles.body}>
                  Lorem ipsum dolor sit amet, consec tetur adipi scing elit.
                  Quisque eget augue ante, sed bibend umigula.
                </p>
                <Button
                  onClick={() => openModal()}
                  sx={{ width: "122px" }}
                  variant="outlined"
                >
                  Read more
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalWindow
        isOpen={isModalOpen}
        onClose={closeModal}
        type="comingSoon"
        title="Coming Soon"
        btnStyle="primary"
        btnText="Ok"
      />
    </>
  );
};

export default Training;
