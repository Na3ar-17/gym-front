import { FC, useEffect } from "react";
import styles from "./Trainers.module.scss";
import TrainersCard from "../../Components/TrainersCard/TrainersCard";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { fetchTrainers } from "../../Redux/Slices/TrainersSlice";
import Progres from "../../Components/Progres/Progres";
import { imgLink } from "../../links";
const Trainers: FC = () => {
  const { trainersCard, status } = useAppSelector((state) => state.trainers);
  const dispatch = useAppDispatch();

  const isTrainersCardLoaded: boolean = status == "pending";

  useEffect(() => {
    dispatch(fetchTrainers());
  }, []);

  return (
    <>
      <div className={styles.box}>
        <div className={styles.headerText}>
          <h1>MEET THE PROS</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, orbi
            egestas lacus ac suscipit ovallis.
          </p>
        </div>
        <div className={styles.cardBox}>
          {isTrainersCardLoaded ? (
            <Progres size={100} />
          ) : (
            trainersCard.map((el, index) => (
              <TrainersCard
                key={index}
                name={el.name}
                category={el.category}
                instagram={el.instagram}
                facebook={el.facebook}
                twitter={el.twitter}
                img={imgLink + el.img}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Trainers;
