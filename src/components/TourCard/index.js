import React from "react";
import styles from "./index.module.css";
import TourDetails from "../TourDetails";
import useHotelData from "../../hooks/useHotelData";

const CURRENCY = 40;

const TourCard = ({ tour }) => {
  const {
    hotel,
    showPrice,
    setShowPrice,
    isModalOpen,
    setModalOpen,
    formatDate,
  } = useHotelData(tour);

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
