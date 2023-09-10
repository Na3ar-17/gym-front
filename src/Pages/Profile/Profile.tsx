import { FC, useEffect } from "react";
import styles from "./Profile.module.scss";
import { IconButton, Tooltip } from "@mui/material";
import Footer from "../../Components/Footer/Footer";
import MenuIcon from "@mui/icons-material/Menu";
import ProfileBody from "../../Components/ProfileBody/ProfileBody";
import { useAppSelector } from "../../hooks/hooks";
import { selectIsAuth } from "../../Redux/Slices/authSlice";
import { useNavigate } from "react-router-dom";
import { IToggleDrawer } from "../../Interfaces/Drawer";
import { IUserData } from "../../Interfaces/UserData";
import Loader from "../../Components/Loader/Loader";

const Profile: FC<IToggleDrawer> = ({ toggleDrawer }) => {
  const navigate = useNavigate();
  const isAuth = useAppSelector((state) => selectIsAuth(state));
  const data = useAppSelector((state) => state.auth.data) as IUserData;

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [data]);

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
        <ProfileBody />
      </div>
      <Footer />
    </>
  );
};

export default Profile;
