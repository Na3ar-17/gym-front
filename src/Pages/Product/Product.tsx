import React, { FC, useState, useEffect, useRef } from "react";
import styles from "./Product.module.scss";
import Header from "../../Components/Header/Header";
import { Container, Rating, Button } from "@mui/material";
import image from "../../../public/images/product.png";

import Footer from "../../Components/Footer/Footer";
import ProductContent from "../../Components/ProductContent/ProductContent";
import { useParams } from "react-router-dom";
import axios from "../../axios";
import { IShopCard } from "../../Interfaces/ShopCard";
import { imgLink } from "../../links";

const Product: FC = () => {
  const [data, setData] = useState<IShopCard | null>(null);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`/shop/shop-item/${id}`)
      .then((res) => setData(res.data[0]))
      .catch((err) => console.log(err));
  }, []);

  if (!data) {
    return null;
  }
  return (
    <>
      <Header isDark={true} />
      <Container maxWidth="xl" sx={{ marginBottom: "100px" }}>
        <div className={styles.container}>
          <ProductContent
            img={imgLink + data.img}
            info={data.info}
            name={data.name}
            price={data.price}
            raiting={data.raiting}
            id={data.id}
          />
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default Product;
