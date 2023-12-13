import styles from "./Filters.module.css";
import { memo } from "react";

const categories = ["Футболки", "Толстовки", "Брюки", "Рубашки", "Обувь"];
const colors = ["Белый", "Черный", "Красный", "Синий", "Зеленый"];

function Filters({
  minPrice,
  maxPrice,
  minPriceChange,
  maxPriceChange,
  categoryChange,
  colorChange
}) {
  return (
    <aside className={styles.filters}>
      <div className={styles.categories}>
        <h3 className={styles.title}>Категории</h3>
        <ul>
          {categories.map((category) => (
            <li key={category}>
              <input
                type="checkbox"
                onChange={categoryChange}
                value={category}
              />
              <span>{category}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.colors}>
        <h3 className={styles.title}>Цвета</h3>
        <ul className={styles.colorList}>
          {colors.map((color) => (
            <li key={color}>
              <input type="checkbox" onChange={colorChange} value={color} />
              <span>{color}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.prices}>
        <h3 className={styles.title}>Цена</h3>
        <div className={styles.priceRange}>
          <input type="text" value={minPrice} onChange={minPriceChange} />
          <span>-</span>
          <input type="text" value={maxPrice} onChange={maxPriceChange} />
        </div>
      </div>
    </aside>
  );
}

export default memo(Filters);
