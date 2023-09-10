import { FC } from "react";
import styles from "./TimeTableRows.module.scss";
import { ITimeTable } from "../../Interfaces/TimeTable";

const TimeTableRows: FC<ITimeTable> = ({
  day_name,
  event1,
  time1,
  event2,
  time2,
  event3,
  time3,
}) => {
  return (
    <>
      <div className={styles.box}>
        <div className={styles.dayNAme}>{day_name}</div>
        <div className={styles.rows}>
          <div>
            <p className={styles.text}>{event1}</p>
            <p className={styles.time}>{time1}</p>
          </div>
          <div>
            <p className={styles.text}>{event2}</p>
            <p className={styles.time}>{time2}</p>
          </div>
          <div>
            <p className={styles.text}>{event3}</p>
            <p className={styles.time}>{time3}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TimeTableRows;
