import { FC, useState } from "react";
import styles from "./Header.module.scss";
import {
  AppBar,
  Badge,
  BadgeProps,
  Container,
  IconButton,
} from "@mui/material";
import lightLogo from "../../../public/images/Light-logo.png";
import darkLogo from "../../../public/images/Dark-logo.png";
import PersonIcon from "@mui/icons-material/Person";
import { styled } from "@mui/material/styles";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import MenuIcon from "@mui/icons-material/Menu";
import { IHeaderMode } from "../../Interfaces/HeaderMode";
import { Link } from "react-router-dom";
import TopMenuDrawer from "../TopMenuDrawer/TopMenuDrawer";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { selectIsAuth } from "../../Redux/Slices/authSlice";
import AvatarComponent from "../Avatar/AvatarComponent";
import { IUserData } from "../../Interfaces/UserData";

const Header: FC<IHeaderMode> = ({ isDark }) => {
  const isAuth = useAppSelector((state) => selectIsAuth(state));
  const data = useAppSelector((state) => state.auth.data) as IUserData;

  const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: -4,
      top: 0,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  }));

  const [topMenuOpen, setTopMenuOpen] = useState(false);

  const toggleTopMenu = () => {
    setTopMenuOpen(!topMenuOpen);
  };

  return (
    <>
      <AppBar
        sx={{
          background: "transparent",
          boxShadow: "none",
        }}
        position="absolute"
      >
        <Container maxWidth="xl">
          <div
            style={{ borderBottom: isDark ? "2px solid #000" : "none" }}
            className={styles.content}
          >
            <div className={styles.logo}>
              <Link to="/">
                <img src={` ${isDark ? darkLogo : lightLogo} `} alt="logo" />
              </Link>
            </div>
            <nav className={styles.navBar}>
              <ul>
                <li>
                  <Link to="/">
                    <p className={`${isDark ? styles.dark : ""}`}>Home</p>
                  </Link>
                </li>
                <li>
                  <p className={`${isDark ? styles.dark : ""}`}>Pages</p>
                </li>
                <li>
                  <p className={`${isDark ? styles.dark : ""}`}>Events</p>
                </li>
                <li>
                  <p className={`${isDark ? styles.dark : ""}`}>Portfolio</p>
                </li>
                <li>
                  <Link to="/shop">
                    <p className={`${isDark ? styles.dark : ""}`}>Shop</p>
                  </Link>
                </li>
                <li>
                  <Link to="/pricing">
                    <p className={`${isDark ? styles.dark : ""}`}>Pricing</p>
                  </Link>
                </li>
              </ul>
            </nav>
            <div className={styles.user}>
              <ul>
                <li>
                  <Link to={isAuth ? "/profile" : "/login"}>
                    {isAuth ? (
                      <div className={styles.avatarComponent}>
                        <AvatarComponent
                          text={data.fullName}
                          size={35}
                          fontSize={19}
                        />
                      </div>
                    ) : (
                      <PersonIcon
                        className={styles.personIcon}
                        sx={{
                          width: "35px",
                          height: "35px",
                          cursor: "pointer",
                          color: isDark ? "#000" : "#fff",
                        }}
                      />
                    )}
                  </Link>
                </li>
                <li>
                  {/* <IconButton aria-label="cart" className={styles.iconButton}>
                    <StyledBadge badgeContent={0} color="primary">
                      <ShoppingBagIcon
                        sx={{
                          width: "30px",
                          height: "30px",
                          color: isDark ? "#000" : "#fff",
                        }}
                      />
                    </StyledBadge>
                  </IconButton> */}
                </li>
                <li>
                  <MenuIcon
                    onClick={toggleTopMenu}
                    className={styles.menuIcon}
                    sx={{
                      width: "35px",
                      height: "35px",
                      cursor: "pointer",
                      color: isDark ? "#000" : "",
                    }}
                  />
                </li>
              </ul>
            </div>
          </div>
          <TopMenuDrawer open={topMenuOpen} onClose={toggleTopMenu} />
        </Container>
      </AppBar>
    </>
  );
};

export default Header;
