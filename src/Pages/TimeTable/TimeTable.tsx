import { FC, useEffect, useState } from "react";
import styles from "./TimeTable.module.scss";
import { Container } from "@mui/material";
import TimeTableRows from "../../Components/TimeTableRows/TimeTableRows";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { fetchTimeTableData } from "../../Redux/Slices/TimeTableSlice";
import Progres from "../../Components/Progres/Progres";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import Loader from "../../Components/Loader/Loader";
interface ITimeTable {
  isFooter: boolean;
  isHeader: boolean;
  isLoader: boolean;
}

const TimeTable: FC<ITimeTable> = ({ isFooter, isHeader, isLoader }) => {
  const { timeTableData, status } = useAppSelector((state) => state.timeTable);
  const dispatch = useAppDispatch();
  const isTimeTableDataLoaded: boolean = status == "pending";
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    dispatch(fetchTimeTableData());
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  return (
    <>
      {isLoader && <Loader isLoading={isLoading} />}
      {isHeader && <Header isDark={false} />}
      <div className={styles.container}>
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "50px",
          }}
        >
          <p className={styles.title}>CLASSES TIMETABLE</p>
          <div className={styles.navigation}></div>
          <div className={styles.table}>
            {isTimeTableDataLoaded ? (
              <>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Progres size={100} />
                </div>
              </>
            ) : (
              timeTableData.map((el, index) => (
                <TimeTableRows
                  key={index}
                  day_name={el.day_name}
                  event1={el.event1}
                  time1={el.time1}
                  event2={el.event2}
                  time2={el.time2}
                  event3={el.event3}
                  time3={el.time3}
                />
              ))
            )}
          </div>
        </Container>
      </div>
      {isFooter && <Footer />}
    </>
  );
};

export default TimeTable;
