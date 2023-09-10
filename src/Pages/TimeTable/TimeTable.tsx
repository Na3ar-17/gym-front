import { FC, useEffect } from "react";
import styles from "./TimeTable.module.scss";
import { Container } from "@mui/material";
import TimeTableRows from "../../Components/TimeTableRows/TimeTableRows";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { fetchTimeTableData } from "../../Redux/Slices/TimeTableSlice";
import Progres from "../../Components/Progres/Progres";

const TimeTable: FC = () => {
  const { timeTableData, status } = useAppSelector((state) => state.timeTable);
  const dispatch = useAppDispatch();
  const isTimeTableDataLoaded: boolean = status == "pending";

  useEffect(() => {
    dispatch(fetchTimeTableData());
  }, []);
  return (
    <>
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
    </>
  );
};

export default TimeTable;
