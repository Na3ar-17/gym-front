import { FC } from "react";
import styles from "./UserData.module.scss";
import AvatarComponent from "../Avatar/AvatarComponent";
import { useAppDispatch } from "../../hooks/hooks";
import { fetchUserData, fetchUserGoods } from "../../Redux/Slices/adminSlice";
interface IUserData {
  fullName: string;
  email: string;
  id: number;
}

const UserData: FC<IUserData> = ({ fullName, email, id }) => {
  const dispatch = useAppDispatch();
  const handleFetchUserData = (userId: number) => {
    dispatch(fetchUserData(userId));
    dispatch(fetchUserGoods(userId));
  };

  return (
    <>
      <div
        onClick={() => {
          handleFetchUserData(id);
        }}
        className={styles.user}
      >
        <div className={styles.avatar}>
          <AvatarComponent fontSize={20} text={fullName} size={50} />
        </div>
        <div className={styles.userData}>
          <p className={styles.userName}>{fullName}</p>
          <p className={styles.userEmail}>{email}</p>
        </div>
      </div>
    </>
  );
};

export default UserData;
