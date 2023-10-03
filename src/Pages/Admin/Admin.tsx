import { useEffect, FC, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {
  clearUserData,
  fetchUsers,
  logOutAdmin,
  selectIsAdmin,
  setSearchUser,
} from "../../Redux/Slices/adminSlice";
import { Button, TextField } from "@mui/material";
import { IconButton, Tooltip } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import styles from "./Admin.module.scss";
import UserData from "../../Components/UserData/UserData";
import Loader from "../../Components/Loader/Loader";
import AvatarComponent from "../../Components/Avatar/AvatarComponent";
import ShopCard from "../../Components/ShopCard/ShopCard";
import { imgLink } from "../../links";
import CreateShopItemForm from "../../Components/CreateShopItemForm/CreateShopItemForm";
interface IAdmin {
  toggleDrawer: () => void;
}

const Admin: FC<IAdmin> = ({ toggleDrawer }) => {
  const isAdmin = useAppSelector((state) => selectIsAdmin(state));

  const dispatch = useAppDispatch();
  const [isLoading, setLoading] = useState<boolean>(true);

  const { users, usersStatus, searchUser, userData, userGoods } =
    useAppSelector((state) => state.admin);
  const isUsersLoaded = usersStatus === "fulfilled";

  const logOut = () => {
    dispatch(logOutAdmin());
  };

  const setUserSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchUser(e.currentTarget.value));
  };

  useEffect(() => {
    dispatch(clearUserData());
    dispatch(fetchUsers()).then(() => setLoading(false));
    dispatch(setSearchUser(""));
  }, []);

  const isUserGoodsLength = userGoods.length === 0;
  const isUserDataLength = userData.length === 0;

  if (!isAdmin) {
    return <Navigate to="/" />;
  }
  return (
    <>
      {isUsersLoaded && <Loader isLoading={isLoading} />}
      <div className={styles.container}>
        <Tooltip title="" onClick={toggleDrawer}>
          <IconButton>
            <MenuIcon
              sx={{ fontSize: "40px", cursor: "pointer", color: "#000" }}
            />
          </IconButton>
        </Tooltip>
        <div className={styles.content}>
          <div className={styles.utils}>
            <div className={styles.title}>Users</div>
            <TextField
              id="filled-basic"
              label="Search user by email"
              variant="filled"
              className={styles.searchInput}
              size="small"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setUserSearch(e);
              }}
            />
          </div>
          <div className={styles.usersTable}>
            {users
              .filter((el) =>
                el.email
                  .toLocaleLowerCase()
                  .includes(searchUser.toLocaleLowerCase())
              )
              .map((el, index) => (
                <UserData
                  id={el.id}
                  fullName={el.fullname}
                  email={el.email}
                  key={index}
                />
              ))}
            {users.filter((el) =>
              el.email
                .toLocaleLowerCase()
                .includes(searchUser.toLocaleLowerCase())
            ).length === 0 && (
              <p className={styles.noUserFound}>no user found</p>
            )}
          </div>
          <div className={styles.userInfo}>
            {isUserDataLength ? (
              <div className={styles.preview}>Select user</div>
            ) : (
              <div className={styles.userData}>
                {userData.map((el, index) => (
                  <div key={index} className={styles.info}>
                    <div className={styles.userAvatar}>
                      <AvatarComponent
                        fontSize={30}
                        size={80}
                        text={el.fullname}
                      />
                    </div>
                    <p className={styles.userName}>{el.fullname}</p>
                    <p className={styles.userEmail}>{el.email}</p>
                    <p className={styles.userGoods}>User goods:</p>
                  </div>
                ))}
                <div className={styles.userGoods}>
                  <div className={styles.cards}>
                    {isUserGoodsLength ? (
                      <p className={styles.noGoods}>No goods</p>
                    ) : (
                      userGoods.map((el, index) => (
                        <ShopCard
                          key={index}
                          id={el.id}
                          img={imgLink + el.img}
                          name={el.name}
                          price={el.price}
                          category={el.category}
                        />
                      ))
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
          <CreateShopItemForm />
          <Button
            sx={{ marginTop: "100px" }}
            onClick={() => {
              logOut();
            }}
            variant="outlined"
            color="error"
          >
            log out
          </Button>
        </div>
      </div>
    </>
  );
};

export default Admin;
