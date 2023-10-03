import { FC, useState } from "react";
import styles from "./ProductContent.module.scss";
import { Rating, Button } from "@mui/material";
import { IShopCard } from "../../Interfaces/ShopCard";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { IUserData } from "../../Interfaces/UserData";
import { fetchAddMyGoods, fetchMyGoods } from "../../Redux/Slices/myGoodsSlice";
import Snack from "../Snack/Snack";
import ModalWindow from "../ModalWindow/ModalWindow";
import { selectIsAuth } from "../../Redux/Slices/authSlice";

const ProductContent: FC<IShopCard> = ({
  img,
  name,
  price,
  raiting,
  info,
  id,
}) => {
  const data = useAppSelector((state) => state.auth.data) as IUserData;
  const userId = data ? data.id : 0;
  const dispatch = useAppDispatch();
  const { myGoods } = useAppSelector((state) => state.myGoods);
  const myGoodsArray = Object.values(myGoods);
  const isProductInMyGoods = myGoodsArray.some((item) => item.id === id);
  const [isSnackOpen, setSnackOpen] = useState<boolean>(false);
  const [snackText, setSnackText] = useState<string>("Item added to profile");
  const [snackType, setSnackType] = useState<"success" | "info">("success");
  const [isOpen, setOpen] = useState<boolean>(false);
  const isAuth = useAppSelector((state) => selectIsAuth(state));

  const onClose = () => {
    setOpen(false);
  };
  const addMyGoods = (productId: number, userId: number) => {
    if (isAuth) {
      if (!isProductInMyGoods) {
        const params = {
          productId: productId,
          userId: userId,
        };
        dispatch(fetchAddMyGoods(params)).then(() => {
          dispatch(fetchMyGoods(userId)).then(() => {
            setSnackOpen(true);
          });
        });
      } else {
        setSnackOpen(true);
        setSnackType("info");
        setSnackText("Item already in your profile");
      }
    } else {
      setOpen(true);
    }
  };

  const closeSnack = () => {
    setSnackOpen(false);
  };

  return (
    <>
      <ModalWindow
        btnStyle="primary"
        btnText="Login"
        isOpen={isOpen}
        onClose={onClose}
        title="You are not auth"
        type="notAuth"
      />
      <Snack
        isOpen={isSnackOpen}
        onClose={closeSnack}
        text={snackText}
        type={snackType}
      />
      <div className={styles.content}>
        <div className={styles.card}>
          <img src={img} alt="img" />
        </div>

        <div className={styles.cardInfo}>
          <p className={styles.title}>{name}</p>
          <p className={styles.price}>${price}</p>
          <Rating
            sx={{
              color: "#000",
            }}
            name="read-only"
            value={raiting}
            readOnly
          />
          <p className={styles.text}>{info}</p>
          <div className={styles.buttons}>
            {/* <div className={styles.btnCount}>
              <RemoveIcon
                sx={{}}
                onClick={() => {
                  decrement();
                }}
              />
              {value}
              <AddIcon
                sx={{}}
                onClick={() => {
                  increment();
                }}
              />
            </div> */}
            <Button
              className={styles.buttonAdd}
              sx={{ width: "190px" }}
              variant="contained"
              onClick={() => {
                addMyGoods(id, userId);
              }}
            >
              Add to profile
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductContent;
