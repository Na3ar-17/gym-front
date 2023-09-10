import { FC, useEffect } from "react";
import { Container } from "@mui/material";
import styles from "./Programs.module.scss";
import ProgramsCard from "../../Components/ProgramsCard/ProgramsCard";
import { useAppSelector, useAppDispatch } from "../../hooks/hooks";
import { fetchPrograms } from "../../Redux/Slices/ProgramsSlice";
import Progres from "../../Components/Progres/Progres";
import { imgLink } from "../../links";

const Programs: FC = () => {
  const { programsCard, status } = useAppSelector((state) => state.programs);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPrograms());
  }, []);

  const isProgramsCardLoaded: boolean = status == "pending";
  return (
    <>
      <div className={styles.box}>
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div className={styles.headerText}>
            <h1>Our programs</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, orbi
              egestas lacus ac suscipit ovallis.
            </p>
          </div>
          <div className={styles.cardBox}>
            {isProgramsCardLoaded ? (
              <Progres size={100} />
            ) : (
              programsCard.map((el, index) => (
                <ProgramsCard
                  key={index}
                  text1={el.text1}
                  text2={el.text2}
                  title={el.title}
                  img={imgLink + el.img}
                />
              ))
            )}
          </div>
        </Container>
      </div>
    </>
  );
};

export default Programs;
