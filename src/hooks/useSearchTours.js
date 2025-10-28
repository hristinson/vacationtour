import { useState, useCallback } from "react";
import { startSearchPrices, getSearchPrices } from "../api/api";

const useSearchTours = (selectedItems) => {
  const [tours, setTours] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSearch, setIsSearch] = useState(false);

  const handleSearchHotels = useCallback(async () => {
    if (selectedItems.length === 0) {
      return;
    }

    const toursArray = [];
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
      setTours(toursArray.sort((a, b) => a.amount - b.amount));
      setIsSearch(true);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      console.error("Error:", err);
      setIsLoading(false);
    }
  }, [selectedItems]);

  return { tours, isLoading, error, isSearch, setIsSearch, handleSearchHotels };
};

export default useSearchTours;
