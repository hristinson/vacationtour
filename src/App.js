import { useEffect, useState, useCallback } from "react";
import "./App.css";
import SearchForm from "./components/SearchForm";
import { startSearchPrices, getSearchPrices } from "./api/api";
import TourCard from "./components/TourCard";
import Loader from "./components/Loader";

function App() {
  const [isSearch, setIsSearch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [tours, setTours] = useState([]);
  const [error, setError] = useState(null);

  const handleSearchHotels = useCallback(async () => {
    if (selectedItems.length === 0) {
      return;
    }

    const toursArray = [];
    // let retries = 0;
    const maxRetries = 2;
    setIsLoading(true);
    try {
      for (const item of selectedItems) {
        const res = await startSearchPrices(item.id);
        const { token, waitUntil } = await res.json();
        const waitTime = new Date(waitUntil).getTime() - new Date().getTime();
        if (waitTime > 0) {
          await new Promise((resolve) => setTimeout(resolve, waitTime));
        }

        let searchResults = null;
        let searchRetries = 2;
        while (!searchResults && searchRetries <= maxRetries) {
          try {
            searchResults = await getSearchPrices(token);
          } catch (error) {
            searchRetries--;
            if (searchRetries > maxRetries) {
              throw new Error("Failed to fetch data after attempts.");
            }
            await new Promise((resolve) => setTimeout(resolve, 1000));
          }
        }

        if (searchResults) {
          const tours = await searchResults.json();
          toursArray.push(...Object.values(tours.prices));
        }
      }

      setTours(toursArray);
      setIsSearch(true);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      console.error("Error:", err);
    }
  }, [selectedItems]);

  useEffect(() => {
    if (isSearch) {
      handleSearchHotels();
    }
  }, [selectedItems, handleSearchHotels, isSearch]);

  return (
    <div className="App">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {isSearch ? (
            <div className="main_results">
              {error ? (
                <div>Error: {error}</div>
              ) : tours.length > 0 ? (
                tours.map((item, key) => <TourCard tour={item} key={key} />)
              ) : (
                <>No results</>
              )}
            </div>
          ) : (
            <div className="main_container">
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
