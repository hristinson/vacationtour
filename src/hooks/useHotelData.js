import { useState, useEffect, useCallback } from "react";
import { getHotel, getCountries } from "../api/api";

const PREFIX = "countriesFlags";

const useHotelData = (tour) => {
  const [hotel, setHotel] = useState();
  const [showPrice, setShowPrice] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const getCountry = useCallback(async (id) => {
    const cachedFlag = localStorage.getItem(`${PREFIX}${id}`);
    if (cachedFlag) {
      return cachedFlag;
    }

    const countriesData = await getCountries();
    const countries = await countriesData.json();
    const items = Object.values(countries);
    const findImageById = (id) => items.find((item) => item.id === id)?.flag;
    const foundFlag = findImageById(id);
    localStorage.setItem(`${PREFIX}${id}`, foundFlag);

    return foundFlag;
  }, []);

  const formatDate = useCallback((dateStr) => {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        const hotelJSON = await getHotel(Number(tour.hotelID));
        const hotel = await hotelJSON.json();
        const img = await getCountry(hotel.countryId);
        setHotel({ ...hotel, countryImg: img, tour });
      } catch (error) {
        console.error("Error loading hotel data:", error);
      }
    };

    if (tour.hotelID) {
      loadData();
    }
  }, [tour, getCountry]);

  return {
    hotel,
    showPrice,
    setShowPrice,
    isModalOpen,
    setModalOpen,
    formatDate,
  };
};

export default useHotelData;
