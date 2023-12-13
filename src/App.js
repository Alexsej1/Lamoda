import { useEffect, useState, useMemo, useCallback } from "react";
import styles from "./styles.module.css";
import Card from "./components/Card/Card";
import Filters from "./components/Filters/Filters";
import SortSearch from "./components/SortSearch/SortSearch";

const Sorts = {
  asc: {
    name: "Сначала дешевые",
    fn: (a, b) => a.price - b.price
  },
  desc: {
    name: "Сначала дорогие",
    fn: (a, b) => b.price - a.price
  },
  popular: {
    name: "Санчала популярные",
    fn: (a, b) => b.rating - a.rating
  }
};

const App = () => {
  const [items, setItems] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [sortBy, setSortBy] = useState("popular");

  useEffect(() => {
    fetch("https://653d2f9cf52310ee6a99f7c3.mockapi.io/items")
      .then((response) => response.json())
      .then((json) => {
        setItems(json);
      });
  }, []);

  const handleChangeSearch = useCallback((e) => {
    setSearchValue(e.target.value);
  }, []);

  const handleSort = useCallback((value) => {
    setSortBy(value);
  }, []);

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);

  const handleMinPriceChange = useCallback((event) => {
    setMinPrice(event.target.value);
  }, []);

  const handleMaxPriceChange = useCallback((event) => {
    setMaxPrice(event.target.value);
  }, []);

  const handleCategoryChange = useCallback((event) => {
    const category = event.target.value;
    setSelectedCategories((prevCat) =>
      prevCat.includes(category)
        ? prevCat.filter((cat) => cat !== category)
        : [...prevCat, category]
    );
  }, []);

  const handleColorChange = useCallback((event) => {
    const color = event.target.value;
    setSelectedColors((prevCol) =>
      prevCol.includes(color)
        ? prevCol.filter((col) => col !== color)
        : [...prevCol, color]
    );
  }, []);

  const filterByPrice = useCallback(
    (product) => {
      const price = product.price;
      if (minPrice && maxPrice) {
        return price >= +minPrice && price <= +maxPrice;
      } else if (minPrice) {
        return price >= +minPrice;
      } else if (maxPrice) {
        return price <= +maxPrice;
      }
      return true;
    },
    [minPrice, maxPrice]
  );

  const filteredProducts = useMemo(() => {
    return items.filter((product) => {
      const priceCondition = filterByPrice(product);
      const categoryCondition =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category);
      const colorCondition =
        selectedColors.length === 0 || selectedColors.includes(product.color);
      return priceCondition && categoryCondition && colorCondition;
    });
  }, [filterByPrice, items, selectedCategories, selectedColors]);

  const sortItems = useCallback(
    (sortBy) => {
      const sortedItems = [...filteredProducts];
      sortedItems.sort(Sorts[sortBy].fn);
      return sortedItems;
    },
    [filteredProducts]
  );

  return (
    <div className={`${styles.container} ${styles.wrapper}`}>
      <Filters
        minPrice={minPrice}
        maxPrice={maxPrice}
        minPriceChange={handleMinPriceChange}
        maxPriceChange={handleMaxPriceChange}
        categoryChange={handleCategoryChange}
        colorChange={handleColorChange}
      />
      <div className={styles.right_side}>
        <SortSearch
          ChangeSearch={handleChangeSearch}
          searchValue={searchValue}
          sortBy={sortBy}
          onSort={handleSort}
          sorts={Sorts}
        />
        <div className={styles.items}>
          {filteredProducts.length === 0 ? (
            <div className={styles.withoutItems}>
              <p>Товаров нет</p>
              <p>Хотите что-нибудь купить?)</p>
            </div>
          ) : (
            sortItems(sortBy)
              .filter(
                (item) =>
                  item.name.toLowerCase().includes(searchValue.toLowerCase()) ||
                  item.description
                    .toLowerCase()
                    .includes(searchValue.toLowerCase())
              )
              .map((item) => (
                <Card
                  key={item.id}
                  name={item.name}
                  rating={item.rating}
                  description={item.description}
                  category={item.category}
                  color={item.color}
                  imageUrl={item.imageUrl}
                  price={item.price}
                />
              ))
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
