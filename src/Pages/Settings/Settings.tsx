import React, { FC, useEffect, useState } from "react";
import styles from "./Settings.module.scss";
import { Button, IconButton, Tooltip } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { logOut, selectIsAuth } from "../../Redux/Slices/authSlice";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { IToggleDrawer } from "../../Interfaces/Drawer";
import AvatarComponent from "../../Components/Avatar/AvatarComponent";
import { IUserData } from "../../Interfaces/UserData";
import Footer from "../../Components/Footer/Footer";
import Loader from "../../Components/Loader/Loader";
import ModalWindow from "../../Components/ModalWindow/ModalWindow";

const Settings: FC<IToggleDrawer> = ({ toggleDrawer }) => {
  const navigate = useNavigate();
  const isAuth = useAppSelector((state) => selectIsAuth(state));
  const data = useAppSelector((state) => state.auth.data) as IUserData;
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [data]);
  const dispatch = useAppDispatch();
  const handleLogOut = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div className={styles.container}>
        <Tooltip title="" onClick={toggleDrawer}>
          <IconButton>
            <MenuIcon
              sx={{ fontSize: "40px", cursor: "pointer", color: "#000" }}
            />
          </IconButton>
        </Tooltip>
        <div className={styles.body}>
          <div className={styles.content}>
            <AvatarComponent
              size={100}
              text={data ? data.fullName : "error error"}
              fontSize={40}
            />
            <p className={styles.email}>
              {data ? data.email : "error@gmail.com"}
            </p>
          </div>
          <div className={styles.logOut}>
            <Button variant="outlined" color="error" onClick={handleLogOut}>
              Log Out
            </Button>
          </div>
        </div>
      </div>
      <ModalWindow
        type="logOut"
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={"You realy want log out?"}
        btnText="Log Out"
        btnStyle="error"
      />
      <Footer />
    </>
  );
};

export default Settings;
