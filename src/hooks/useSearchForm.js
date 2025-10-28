import { useState, useCallback } from "react";
import { searchGeo } from "../api/api";

const useSearchForm = (setSelectedItems) => {
  const [query, setQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleChange = useCallback(async (e) => {
    const query = e.target.value;
    setQuery(query);
    setIsDropdownOpen(query.length > 0);

    if (query.length > 0) {
      try {
        const response = await searchGeo(query);
        const data = await response.json();
        setFilteredResults(Object.values(data));
      } catch (error) {
        console.error("Search failed:", error);
      }
    } else {
      setFilteredResults([]);
    }
  }, []);

  const handleSelect = useCallback(
    (item) => {
      setSelectedItems((prevItems) => [...prevItems, item]);
      setQuery("");
      setIsDropdownOpen(false);
    },
    [setSelectedItems]
  );

  const handleRemoveItem = useCallback(
    (index) => {
      setSelectedItems((prevItems) =>
        prevItems.filter((_, idx) => idx !== index)
      );
    },
    [setSelectedItems]
  );

  return {
    query,
    filteredResults,
    isDropdownOpen,
    handleChange,
    handleSelect,
    handleRemoveItem,
  };
};

export default useSearchForm;
