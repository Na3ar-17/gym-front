import { FC } from "react";
import styles from "./ProgramsCard.module.scss";
import { IPrograms } from "../../Interfaces/Programs";

const ProgramsCard: FC<IPrograms> = ({ img, title, text1, text2 }) => {
  return (
    <>
      <div className={styles.cardContainer}>
        <div className={styles.imgBox}>
          <img className={styles.img} src={img} alt="img1" />
        </div>
        <p>
          {text1} <span className={styles.dot}></span> {text2}
        </p>
        <p className={styles.title}>{title}</p>
        <div className={styles.underline}></div>
      </div>
    </>
  );
};

export default ProgramsCard;
