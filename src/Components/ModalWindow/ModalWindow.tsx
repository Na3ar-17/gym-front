import { FC } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { fetchDeleteMyGoodsByUserId } from "../../Redux/Slices/myGoodsSlice";
import { logOut } from "../../Redux/Slices/authSlice";
import { IUserData } from "../../Interfaces/UserData";
import { useNavigate } from "react-router-dom";
import styles from "./ModalWindow.module.scss";
import { logOutAdmin } from "../../Redux/Slices/adminSlice";

interface IModalWindwo {
  isOpen: boolean;
  onClose: () => void;
  title: string | null;
  type:
    | "deleteMyGoods"
    | "logOut"
    | "notAuth"
    | "comingSoon"
    | "errorAuth"
    | "imageError"
    | "fileNotImage"
    | "deleteShopItem";
  btnText: string;
  btnStyle: "error" | "primary";
}
const ModalWindow: FC<IModalWindwo> = ({
  isOpen,
  onClose,
  title,
  type,
  btnText,
  btnStyle,
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.auth.data) as IUserData;
  const userId = data ? data.id : null;

  const handleDeleteMyGoods = (user_id: number) => {
    dispatch(fetchDeleteMyGoodsByUserId(user_id));
    onClose();
  };

  const logOutData = () => {
    dispatch(logOut());
    dispatch(logOutAdmin());
  };

  const goTologin = () => {
    navigate("/login");
  };

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={styles.modal}>
          <Typography
            className={styles.title}
            id="modal-modal-title"
            variant="h6"
            component="h3"
          >
            {title}
          </Typography>
          <Button
            sx={{ mt: 2 }}
            variant="outlined"
            color={btnStyle}
            className={styles.button}
            onClick={() => {
              switch (type) {
                case "deleteMyGoods":
                  handleDeleteMyGoods(userId !== null ? userId : 0);
                  break;
                case "logOut":
                  logOutData();
                  break;
                case "notAuth":
                  goTologin();
                  break;
                case "comingSoon":
                  onClose();
                  break;
                case "errorAuth":
                  onClose();
                  break;
                case "imageError":
                  onClose();
                  break;
                case "fileNotImage":
                  onClose();
                  break;
                default:
                  break;
              }
            }}
          >
            {btnText}
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalWindow;
