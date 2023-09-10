import { FC, useState, useEffect } from "react";
import styles from "./ProductContent.module.scss";
import image from "../../../public/images/product.png";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Rating, Button } from "@mui/material";
import { IShopCard } from "../../Interfaces/ShopCard";

const ProductContent: FC<IShopCard> = ({ img, name, price, raiting, info }) => {
  const [value, setValue] = useState<number>(1);

  const increment = () => {
    if (value < 10) {
      setValue((prev) => prev + 1);
    }
  };

  const decrement = () => {
    if (value > 1) {
      setValue((prev) => prev - 1);
    }
  };

  return (
    <>
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
            <div className={styles.btnCount}>
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
            </div>
            <Button
              className={styles.buttonAdd}
              sx={{ width: "190px" }}
              variant="contained"
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
