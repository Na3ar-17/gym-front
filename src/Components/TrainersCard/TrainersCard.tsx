import { FC } from "react";
import styles from "./Trainers.module.scss";
import SocialMedia from "../SocialMedia/SocialMedia";
import { ITrainers } from "../../Interfaces/Trainers";

const TrainersCard: FC<ITrainers> = ({
  img,
  category,
  name,
  instagram,
  facebook,
  twitter,
}) => {
  return (
    <>
      <div className={styles.cardContainer}>
        <div className={styles.imgBox}>
          <SocialMedia
            instagram={instagram}
            twitter={twitter}
            facebook={facebook}
          />
          <img className={styles.img} src={img} alt="img1" />
        </div>
        <p>{category}</p>
        <p className={styles.title}>{name}</p>
        <div className={styles.underline}></div>
      </div>
    </>
  );
};

export default TrainersCard;
