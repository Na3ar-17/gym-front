import { FC, useEffect, useState } from "react";
import styles from "./ProfileBody.module.scss";
import ShopCard from "../../Components/ShopCard/ShopCard";
import { useAppSelector, useAppDispatch } from "../../hooks/hooks";
import { IUserData } from "../../Interfaces/UserData";
import {
  fetchDeleteMyGoodsByUserId,
  fetchMyGoods,
} from "../../Redux/Slices/myGoodsSlice";
import { imgLink } from "../../links";
import Progres from "../Progres/Progres";
import { Button } from "@mui/material";
import ModalWindow from "../ModalWindow/ModalWindow";

const ProfileBody: FC = () => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const { myGoods, status } = useAppSelector((state) => state.myGoods);
  const data = useAppSelector((state) => state.auth.data) as IUserData;
  const isMyGoodsLoaded = status === "pending";
  const userId = data ? data.id : null;
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (userId === null) {
      return;
    } else {
      dispatch(fetchMyGoods(userId));
    }
  }, [userId]);

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const isMyGoodsLenght = myGoods.length > 0;

  const total =
    isMyGoodsLenght &&
    myGoods.reduce(
      (accumulator, current) =>
        accumulator +
        (typeof current.price === "string"
          ? parseFloat(current.price)
          : current.price),
      0
    );

  return (
    <>
      <div className={styles.body}>
        <h1>My goods</h1>
        <Button
          className={isMyGoodsLenght ? styles.deleteBtn : styles.hidden}
          variant="outlined"
          color="error"
          onClick={() => setModalOpen(true)}
        >
          Delete All
        </Button>
        <div className={styles.cards}>
          {isMyGoodsLoaded ? (
            <div className={styles.progresBox}>
              <Progres size={60} />
            </div>
          ) : myGoods.length > 0 ? (
            myGoods.map((el, index) => (
              <ShopCard
                key={index}
                img={imgLink + el.img}
                info={el.info}
                category={el.category}
                name={el.name}
                id={el.id}
                price={el.price}
                raiting={el.raiting}
              />
            ))
          ) : (
            <h1 style={{ fontSize: " 18px" }}>No items</h1>
          )}
        </div>
        {isMyGoodsLenght && (
          <div className={styles.totalPrice}>
            <p>Total price :{"$" + total}</p>
            <Button
              sx={{ marginTop: "15px" }}
              variant="contained"
              color="success"
            >
              Buy
            </Button>
          </div>
        )}

        <ModalWindow
          type="deleteMyGoods"
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title="You realy want to delete your goods?"
          btnText="Delete"
          btnStyle="error"
        />
      </div>
    </>
  );
};

export default ProfileBody;
