import { FC } from "react";
import styles from "./Loader.module.scss";
import { Ripples } from "@uiball/loaders";

interface ILoading {
  isLoading: boolean;
}

const Loader: FC<ILoading> = ({ isLoading = true }) => {
  return (
    <div className={`${styles.loader} ${isLoading ? styles.visible : ""}`}>
      <Ripples size={65} speed={5} color="black" />
    </div>
  );
};

export default Loader;
