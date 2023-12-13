import styles from "./SortSearch.module.css";
import { memo } from "react";

function SortSearch({ sortBy, onSort, ChangeSearch, searchValue, sorts }) {
  const handleSortChange = (e) => {
    onSort(e.target.value);
  };

  const sortOptions = Object.entries(sorts).map(([key, sort]) => (
    <option key={key} value={key}>
      {sort.name}
    </option>
  ));

  return (
    <div className={`${styles.sortsFind} ${styles.wrapper}`}>
      <select value={sortBy} onChange={handleSortChange}>
        {sortOptions}
      </select>

      <input
        onChange={ChangeSearch}
        value={searchValue}
        type="text"
        placeholder="Поиск..."
      />
    </div>
  );
}

export default memo(SortSearch);
