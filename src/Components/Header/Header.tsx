import { FC, useState, useEffect } from "react";
import styles from "./Header.module.scss";
import { AppBar, Container, IconButton } from "@mui/material";
import lightLogo from "../../../public/images/Light-logo.png";
import darkLogo from "../../../public/images/Dark-logo.png";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";
import { IHeaderMode } from "../../Interfaces/HeaderMode";
import { Link } from "react-router-dom";
import TopMenuDrawer from "../TopMenuDrawer/TopMenuDrawer";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { selectIsAuth } from "../../Redux/Slices/authSlice";
import AvatarComponent from "../Avatar/AvatarComponent";
import { IUserData } from "../../Interfaces/UserData";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { styled } from "@mui/material/styles";
import Badge, { BadgeProps } from "@mui/material/Badge";
import { fetchMyGoods } from "../../Redux/Slices/myGoodsSlice";
import { selectIsAdmin } from "../../Redux/Slices/adminSlice";
import { AdminPanelSettings } from "@mui/icons-material";

const Header: FC<IHeaderMode> = ({ isDark }) => {
  const isAuth = useAppSelector((state) => selectIsAuth(state));
  const data = useAppSelector((state) => state.auth.data) as IUserData;
  const { myGoods } = useAppSelector((state) => state.myGoods);
  const dispatch = useAppDispatch();
  const userId = data ? data.id : null;

  useEffect(() => {
    if (userId !== null) {
      dispatch(fetchMyGoods(userId));
    }
  }, [userId]);
  const myGoodsLength = myGoods.length;
  const [topMenuOpen, setTopMenuOpen] = useState(false);

  const toggleTopMenu = () => {
    setTopMenuOpen(!topMenuOpen);
  };

  const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  }));

  const isAdmin = useAppSelector((state) => selectIsAdmin(state));

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
                  <Link to="/time-table">
                    <p className={`${isDark ? styles.dark : ""}`}>Time Table</p>
                  </Link>
                </li>
                <li>
                  <Link to="/our-team">
                    <p className={`${isDark ? styles.dark : ""}`}>Our Team</p>
                  </Link>
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
                <li>
                  <Link to="/contact-us">
                    <p className={`${isDark ? styles.dark : ""}`}>Contact Us</p>
                  </Link>
                </li>
              </ul>
            </nav>
            <div className={styles.user}>
              <ul>
                <li>
                  {isAdmin && (
                    <Link to="/admin">
                      <AdminPanelSettings
                        className={styles.adminIcon}
                        sx={{
                          fontSize: "35px",
                          color: isDark ? "#000" : "#fff",
                        }}
                      />
                    </Link>
                  )}
                </li>
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
                  <Link to="/profile">
                    <IconButton aria-label="cart" className={styles.iconButton}>
                      <StyledBadge
                        badgeContent={isAuth ? myGoodsLength : 0}
                        color="primary"
                      >
                        <ShoppingBagIcon
                          sx={{
                            width: "30px",
                            height: "30px",
                            color: isDark ? "#000" : "#fff",
                          }}
                        />
                      </StyledBadge>
                    </IconButton>
                  </Link>
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
