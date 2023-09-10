import { FC } from "react";
import CircularProgress from "@mui/material/CircularProgress";
interface ISize {
  size: number;
}

const Progres: FC<ISize> = ({ size }) => {
  return (
    <>
      <CircularProgress size={size} />
    </>
  );
};

export default Progres;
