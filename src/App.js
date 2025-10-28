import { useCallback, useEffect, useState } from "react";
import SearchForm from "./components/SearchForm";
import Loader from "./components/Loader";
import TourCard from "./components/TourCard";
import useSearchTours from "./hooks/useSearchTours";
import styles from "./main.module.css";
import { stopSearchPrices } from "./api/api";

function App() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [token, setToken] = useState(null);
  const {
    tours,
    isLoading,
    error,
    isSearch,
    setIsSearch,
    handleSearchHotels,
    setIsLoading,
  } = useSearchTours(selectedItems, setToken);

  const stopSearch = useCallback(() => {
    stopSearchPrices(token);
    setIsSearch(false);
    setIsLoading(false);
  }, [token, setIsSearch, setIsLoading]);

  useEffect(() => {
    if (isSearch) {
      handleSearchHotels();
    }
  }, [selectedItems, handleSearchHotels, isSearch]);

  return (
    <div className={styles.main}>
      {isLoading ? (
        <Loader stopSearch={stopSearch} />
      ) : (
        <>
          {isSearch ? (
            <div className={styles.main_results}>
              {error ? (
                <div>Error: {error}</div>
              ) : tours.length > 0 ? (
                tours.map((item, key) => <TourCard tour={item} key={key} />)
              ) : (
                <div className={styles.no_results}>
                  <div onClick={() => setIsSearch(false)}>
                    No results, tap on this text and try again
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className={styles.main_container}>
              <SearchForm
                setIsSearch={setIsSearch}
                selectedItems={selectedItems}
                setSelectedItems={setSelectedItems}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
