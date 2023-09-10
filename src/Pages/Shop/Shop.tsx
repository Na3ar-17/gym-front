import { FC, useEffect, useState } from "react";
import Header from "../../Components/Header/Header";
import { Container } from "@mui/material";
import styles from "./Shop.module.scss";
import { Slider, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Footer from "../../Components/Footer/Footer";
import Pagination from "@mui/material/Pagination";
import ShopCard from "../../Components/ShopCard/ShopCard";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import Progres from "../../Components/Progres/Progres";
import { imgLink } from "../../links";
import {
  fetchShopItems,
  changeSearchValue,
  fetchCategories,
  fetchSortByCategory,
  clearSortedCards,
} from "../../Redux/Slices/ShopItemsSlice";

const Shop: FC = () => {
  const { shopCards, status, searchValue, categories, sortedCards } =
    useAppSelector((state) => state.shopItems);
  const [priceFilter, setPriceFilter] = useState(10);
  const dispatch = useAppDispatch();
  const isShopCardsLoaded: boolean = status == "pending";
  const [currentCategory, setCurrentCategory] = useState<string>("All");

  useEffect(() => {
    dispatch(fetchShopItems());
    dispatch(fetchCategories());
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeSearchValue(e.currentTarget.value));
  };

  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    setPriceFilter(newValue as number);
  };

  const handleSort = (category: string) => {
    dispatch(fetchSortByCategory(category));
    setCurrentCategory(category);
  };
  const handleClear = () => {
    dispatch(clearSortedCards()), setCurrentCategory("All");
  };
  console.log(sortedCards);

  return (
    <>
      <Header isDark={true} />
      <Container maxWidth="xl">
        <div className={styles.container}>
          <div className={styles.bar}>
            <div className={styles.currentCategory}>
              <p>Category: {currentCategory}</p>
            </div>
          </div>
          {isShopCardsLoaded ? (
            <div className={styles.progres}>
              <Progres size={100} />
            </div>
          ) : (
            <>
              <div className={styles.shopCards}>
                {sortedCards.length > 0
                  ? sortedCards
                      .filter(
                        (el) =>
                          el.name
                            .toLowerCase()
                            .includes(searchValue.toLowerCase()) &&
                          el.price >= priceFilter
                      )
                      .map((el, index) => (
                        <ShopCard
                          key={index}
                          img={imgLink + el.img}
                          category={el.category}
                          name={el.name}
                          price={el.price}
                          id={el.id}
                        />
                      ))
                  : shopCards
                      .filter(
                        (el) =>
                          el.name
                            .toLowerCase()
                            .includes(searchValue.toLowerCase()) &&
                          el.price >= priceFilter
                      )
                      .map((el, index) => (
                        <ShopCard
                          key={index}
                          img={imgLink + el.img}
                          category={el.category}
                          name={el.name}
                          price={el.price}
                          id={el.id}
                        />
                      ))}
                {sortedCards.length > 0 &&
                  sortedCards.filter(
                    (el) =>
                      el.name
                        .toLowerCase()
                        .includes(searchValue.toLowerCase()) &&
                      el.price >= priceFilter
                  ).length === 0 && (
                    <p className={styles.noItemsFound}>No items found</p>
                  )}
                {shopCards.filter(
                  (el) =>
                    el.name.toLowerCase().includes(searchValue.toLowerCase()) &&
                    el.price >= priceFilter
                ).length === 0 && (
                  <p className={styles.noItemsFound}>No items found</p>
                )}
              </div>

              <div className={styles.filter}>
                <div className={styles.searchBox}>
                  <TextField
                    className={styles.inputSearch}
                    label="Type your search"
                    variant="standard"
                    value={searchValue}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleSearch(e)
                    }
                  />
                  <SearchIcon className={styles.searchIcon} />
                </div>
                <div className={styles.filterBox}>
                  <p>Filter By Price</p>
                  <Slider
                    value={priceFilter}
                    aria-label="Default"
                    valueLabelDisplay="auto"
                    onChange={handlePriceChange}
                    min={10}
                    max={300}
                  />
                </div>
                <div className={styles.categoriesBox}>
                  <p className={styles.title}>Categories</p>
                  <p
                    onClick={() => {
                      handleClear();
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    ALL
                  </p>
                  {categories.map((el, index) => (
                    <p
                      key={index}
                      className={styles.category}
                      onClick={() => {
                        handleSort(el.category);
                      }}
                    >
                      {el.category}
                    </p>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
        <div className={styles.pagination}>
          <Pagination count={2} color="primary" />
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default Shop;
