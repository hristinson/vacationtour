import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import { getHotel, getCountries } from "../../api/api";

const getCountry = async (id) => {
  const countriesData = await getCountries();
  const countries = await countriesData.json();
  const items = Object.values(countries);
  const findImageById = (id) => items.find((item) => item.id === id)?.flag;
  return findImageById(id);
};

const TourCard = ({ tour }) => {
  const [hotel, setHotel] = useState();
  const [showPrice, setShowPrice] = useState(false);

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
  }, [tour]);

  return (
    <div className={styles.card}>
      {hotel ? (
        <div className={styles.info}>
          <h3 className={styles.hotelName}>{hotel.name}</h3>
          <p className={styles.cityName}>{tour.cityName}</p>
          {hotel.img && (
            <img
              src={hotel.img}
              alt={hotel.description}
              className={styles.image}
            />
          )}
          <p className={styles.countryName}>
            {hotel.countryName}, {hotel.cityName}
          </p>
          {hotel.countryImg && <img src={hotel.countryImg} alt="alt" />}
          <p className={styles.cityName}>Старт тура {tour.startDate}</p>
          <p className={styles.hotelId}>
            {showPrice ? (
              <>
                {hotel &&
                  hotel.tour.amount
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
