import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";

interface TopMenuDrawerProps {
  open: boolean;
  onClose: () => void;
}

const TopMenuDrawer: React.FC<TopMenuDrawerProps> = ({ open, onClose }) => {
  return (
    <Drawer anchor="top" open={open} onClose={onClose}>
      <Box sx={{ width: "100%" }} role="presentation">
        <List>
          {[
            { text: "Home", icon: <HomeIcon />, link: "/" },
            { text: "Shop", icon: <ShoppingBagIcon />, link: "/shop" },
            { text: "Pricing", icon: <OndemandVideoIcon />, link: "/pricing" },
            { text: "Pforile", icon: <PersonIcon />, link: "/profile" },
          ].map(({ text, icon, link }) => (
            <ListItem key={text} disablePadding>
              <ListItemButton component={Link} to={link}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Box>
    </Drawer>
  );
};

export default TopMenuDrawer;
