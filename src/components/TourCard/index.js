import React, { useEffect, useState, useCallback } from "react";
import styles from "./index.module.css";
import { getHotel, getCountries } from "../../api/api";
import TourDetails from "../TourDetails";

const PREFIX = "countriesFlags";
const CURRENCY = 40;

const TourCard = ({ tour }) => {
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

  return (
    <div className={styles.card}>
      {isModalOpen && (
        <TourDetails
          isOpen={isModalOpen}
          onClose={() => {
            setModalOpen(false);
          }}
          data={hotel}
        />
      )}
      {hotel ? (
        <div className={styles.info}>
          <p className={styles.cityName}>{tour.cityName}</p>
          {hotel.img && (
            <img
              src={hotel.img}
              alt={hotel.description}
              className={styles.image}
              onClick={() => {
                setModalOpen(true);
              }}
            />
          )}
          <h3 className={styles.hotelName}>{hotel.name}</h3>
          <p className={styles.countryName}>
            {hotel.countryImg && (
              <img
                src={hotel.countryImg}
                alt="alt"
                style={{ marginRight: "8px" }}
              />
            )}
            {hotel.countryName}, {hotel.cityName}
          </p>

          <p className={styles.date}>
            Старт тура <br />
            {formatDate(tour.startDate)}
          </p>

          <p className={styles.price}>
            {showPrice ? (
              <>
                {hotel &&
                  (hotel.tour.amount * CURRENCY)
                    .toString()
                    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ")}
                {""} грн.
              </>
            ) : (
              <button
                onClick={() => {
                  setShowPrice(true);
                }}
              >
                Відкрити ціну
              </button>
            )}
          </p>
        </div>
      ) : (
        <>No hotel data</>
      )}
    </div>
  );
};

export default TourCard;
