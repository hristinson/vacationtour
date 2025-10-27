import { useState, useEffect } from "react";

const useCachedCountryImage = (id) => {
  const [flag, setFlag] = useState(null);

  useEffect(() => {
    const fetchCountryImage = async () => {
      const cachedFlag = localStorage.getItem(id);
      if (cachedFlag) {
        setFlag(cachedFlag);
        return;
      }

      const countriesData = await getCountries();
      const countries = await countriesData.json();
      const items = Object.values(countries);
      const foundFlag = items.find((item) => item.id === id)?.flag;

      if (foundFlag) {
        localStorage.setItem(id, foundFlag);
        setFlag(foundFlag);
      }
    };

    fetchCountryImage();
  }, [id]);

  return flag;
};

export default useCachedCountryImage;
