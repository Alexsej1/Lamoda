import styles from "./Card.module.css";
import { memo } from "react";
function Card({ imageUrl, name, rating, description, category, color, price }) {
  return (
    <div className={styles.card}>
      <img src={imageUrl} alt={name} className={styles.itemImg} />
      <div className={` ${styles.wrapper} ${styles.wrapper_card_name}`}>
        <h2>{name}</h2>
        <div className={styles.Stars}>
          <img src="./img/StarActive.svg" alt="Звезда" />

          <img src="./img/StarActive.svg" alt="Звезда" />

          <img src="./img/StarActive.svg" alt="Звезда" />

          <img src="./img/StarActive.svg" alt="Звезда" />

          <img src="./img/StarUnActive.svg" alt="Звезда" />
          <span className={styles.stars_number}>({rating})</span>
        </div>
      </div>
      <p className={styles.descr}>{description}</p>
      <div className={styles.descriebes}>
        {category}/{color}
      </div>
      <span className={styles.price}>{price}$</span>
    </div>
  );
}
export default memo(Card);
