import { FC, useState } from "react";
import styles from "./ShopCard.module.scss";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { IShopCard } from "../../Interfaces/ShopCard";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {
  fetchAddMyGoods,
  fetchDeleteOneById,
  fetchMyGoods,
} from "../../Redux/Slices/myGoodsSlice";
import { IUserData } from "../../Interfaces/UserData";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import Snack from "../Snack/Snack";
import ModalWindow from "../ModalWindow/ModalWindow";
import { selectIsAuth } from "../../Redux/Slices/authSlice";
import BackspaceOutlinedIcon from "@mui/icons-material/BackspaceOutlined";
import {
  fetchDeleteShopItem,
  selectIsAdmin,
} from "../../Redux/Slices/adminSlice";
import { fetchShopItems } from "../../Redux/Slices/ShopItemsSlice";

const ShopCard: FC<IShopCard> = ({ img, category, name, price, id }) => {
  const isAdmin = useAppSelector((state) => selectIsAdmin(state));
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [isOpen, setOpen] = useState(false);
  const [currentType, setCurrentType] = useState<"success" | "info">("success");
  const [snackText, setSnackText] = useState<string>("Item added to profile");
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.auth.data) as IUserData;
  const userId = data ? data.id : null;
  const { myGoods } = useAppSelector((state) => state.myGoods);
  const isAuth = useAppSelector((state) => selectIsAuth(state));

  const myGoodsArray = Object.values(myGoods);
  const isProductInMyGoods = myGoodsArray.some((item) => item.id === id);
  const { pageSize, currentPage } = useAppSelector((state) => state.shopItems);
  const deleteMyGoods = (userId: number, productId: number) => {
    dispatch(fetchDeleteOneById({ userId, productId })).then(() => {
      dispatch(fetchMyGoods(userId));
      setCurrentType("info");
      setSnackText("Item removed from profile");
      setOpen(true);
    });
  };
  const close = () => {
    setOpen(false);
  };

  const addMyGoods = (productId: number, userId: number) => {
    const params = {
      productId: productId,
      userId: userId,
    };
    dispatch(fetchAddMyGoods(params)).then(() => {
      dispatch(fetchMyGoods(userId));
      setCurrentType("success");
      setSnackText("Item added to profile");
      setOpen(true);
    });
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const deleteShopItem = (productId: number) => {
    dispatch(fetchDeleteShopItem(productId)).then(() => {
      dispatch(fetchShopItems({ currentPage, pageSize }));
    });
  };

  return (
    <>
      <div className={styles.card}>
        {isAdmin && (
          <BackspaceOutlinedIcon
            onClick={() => {
              deleteShopItem(id);
            }}
            className={styles.deleteIcon}
          />
        )}
        <div className={styles.content}>
          <div className={styles.image}>
            <Link to={`/shop/shop-item/${id}`}>
              <img src={img} alt="img" />
            </Link>
          </div>
          <div className={styles.footer}>
            <p className={styles.category}>{category}</p>
            <div className={styles.name}>{name}</div>
            <div className={styles.buy}>
              <p className={styles.price}>${price}</p>

              {isAuth ? (
                isProductInMyGoods ? (
                  <RemoveShoppingCartIcon
                    onClick={() => userId !== null && deleteMyGoods(userId, id)}
                  />
                ) : (
                  <ShoppingCartIcon
                    onClick={() => userId !== null && addMyGoods(id, userId)}
                    sx={{ color: "#000", cursor: "pointer" }}
                  />
                )
              ) : (
                <ShoppingCartIcon
                  onClick={() => {
                    setModalOpen(true);
                  }}
                  sx={{ color: "#000", cursor: "pointer" }}
                />
              )}
            </div>
          </div>
        </div>
        <Snack
          type={currentType}
          isOpen={isOpen}
          onClose={close}
          text={snackText}
        />
        <ModalWindow
          type="notAuth"
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title="You are not auth"
          btnText="Login"
          btnStyle="primary"
        />
      </div>
    </>
  );
};

export default ShopCard;
