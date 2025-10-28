import { useCallback } from "react";
import DeletePointButton from "../DeletePointButton";
import ElementIcon from "../ElementIcon";
import styles from "./index.module.css";
import useSearchForm from "../../hooks/useSearchForm";

const SearchForm = ({ setIsSearch, selectedItems, setSelectedItems }) => {
  const {
    query,
    filteredResults,
    isDropdownOpen,
    handleChange,
    handleSelect,
    handleRemoveItem,
  } = useSearchForm(setSelectedItems);

  const handleFormSubmit = useCallback(
    (event) => {
      event.preventDefault();
      setIsSearch(true);
    },
    [setIsSearch]
  );

  return (
    <form onSubmit={handleFormSubmit} className={styles.search_container}>
      <h3>Форма пошуку турів</h3>
      <input
        type="text"
        placeholder="Почните вводити країну або локацію"
        value={query}
        onChange={handleChange}
        className={styles.input}
      />

      {isDropdownOpen && filteredResults.length > 0 && (
        <div style={{ position: "relative", width: "100%" }}>
          <ul style={{ zIndex: 10 }}>
            {filteredResults.map((item, index) => (
              <li key={index} onClick={() => handleSelect(item)}>
                <ElementIcon item={item} />
                {item.name} {item.type && `(${item.type})`}{" "}
              </li>
            ))}
          </ul>
        </div>
      )}

      {selectedItems.length > 0 && (
        <div className={styles.list_items_container}>
          <h3>Обрані точки маршрутів:</h3>
          <ul style={{ zIndex: 1, position: "relative" }}>
            {selectedItems.map((item, index) => (
              <li key={index}>
                <div className={styles.list_item}>
                  <div>
                    <ElementIcon item={item} />
                    {item.name}
                  </div>
                  <DeletePointButton onClick={() => handleRemoveItem(index)} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      <button type="submit" className={styles.submit_button}>
        Знайти
      </button>
    </form>
  );
};

export default SearchForm;
