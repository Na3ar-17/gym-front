import * as React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import styles from "./LeftMenuDrawer.module.scss";
import { Avatar } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks/hooks";
import { selectIsAdmin } from "../../Redux/Slices/adminSlice";

type Anchor = "left";

interface LeftMenuDrawerProps {
  open: boolean;
  onClose: () => void;
  email: string;
  fullName: string;
}

const LeftMenuDrawer: React.FC<LeftMenuDrawerProps> = ({
  open,
  onClose,
  email,
  fullName,
}) => {
  const isAdmin = useAppSelector((state) => selectIsAdmin(state));

  const list = (_anchor: Anchor) => (
    <div role="presentation" onClick={onClose} onKeyDown={onClose}>
      <List>
        {[
          {
            text: "Profile",
            icon: <PersonIcon />,
            link: "/profile",
          },
          {
            text: "Shop",
            icon: <ShoppingBagIcon />,
            link: "/shop",
          },
          { text: "Home", icon: <HomeIcon />, link: "/" },
          {
            text: "Settings",
            icon: <SettingsIcon />,
            link: "/profile/settings",
          },
          {
            text: "Admin",
            icon: <AdminPanelSettingsIcon />,
            link: isAdmin ? "/admin" : "/admin-login",
          },
        ].map(({ text, icon, link }) => (
          <ListItem key={text} disablePadding>
            <ListItemButton component={Link} to={link}>
              {icon}
              <ListItemText sx={{ marginLeft: "10px" }} primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const stringToColor = (string: string) => {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
  };
  const stringAvatar = (fullName: string) => {
    return {
      sx: {
        bgcolor: stringToColor(fullName),
      },
      children: `${fullName.split(" ")[0][0]}${fullName.split(" ")[1][0]}`,
    };
  };
  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <div className={styles.container}>
        <div className={styles.body}>
          <div className={styles.profileContent}>
            <div className={styles.card}>
              <div className={styles.content}>
                <Avatar
                  className={styles.avatar}
                  {...stringAvatar(fullName.trim())}
                />
                <p className={styles.email}>{email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {list("left")}
    </Drawer>
  );
};

export default LeftMenuDrawer;
