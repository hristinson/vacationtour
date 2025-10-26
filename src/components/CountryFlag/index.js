import React from "react";
// import styles from "./index.module.css";

const CountryFlag = ({ countries, item }) => {
  return (
    <img
      src={
        countries.find((country) => country.id === item.id)?.flag ||
        "https://flagcdn.com/w40/eu.png"
      }
      alt="Flag"
      style={{ marginRight: 10 }}
    />
  );
};

export default CountryFlag;
