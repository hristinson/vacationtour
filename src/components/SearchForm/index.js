import { useState, useEffect } from "react";
import { getCountries, searchGeo } from "../../api/api";
import DeletePointButton from "../DeletePointButton";
import CountryFlag from "../CountryFlag";
import styles from "./index.module.css";

const SearchForm = () => {
  const [query, setQuery] = useState("");
  const [countries, setCountries] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchCountries = async () => {
      const response = await getCountries();
      const data = await response.json();
      setCountries(Object.values(data));
    };
    fetchCountries();
  }, []);

  const handleSubmit = () => {
    alert("submit");
  };

  const handleChange = async (e) => {
    const query = e.target.value;
    setQuery(query);
    setIsDropdownOpen(query.length > 0);

    const response = await searchGeo(query);
    const data = await response.json();
    setFilteredResults(Object.values(data));
  };

  const handleSelect = (item) => {
    setSelectedItems((prevItems) => [...prevItems, item]);
    setQuery("");
    setIsDropdownOpen(false);
  };

  const handleRemoveItem = (index) => {
    setSelectedItems((prevItems) =>
      prevItems.filter((_, idx) => idx !== index)
    );
  };

  return (
    <form onSubmit={handleSubmit} className={styles.search_container}>
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
                <CountryFlag countries={countries} item={item} />
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
                    <CountryFlag countries={countries} item={item} />
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
