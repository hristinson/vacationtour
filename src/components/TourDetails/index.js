import styles from "./index.module.css";

const TourDetails = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.modal_overlay} onClick={handleOverlayClick}>
      <div className={styles.modal_content}>
        <button className={styles.close_btn} onClick={onClose}>
          &times;
        </button>
        <img src={data.img} alt={data.description} />
        <h2>{data.name}</h2>
        <div className={styles.modal_fields}>
          {data.cityName}
          {", "} {data.countryName}
        </div>
        <div className={styles.modal_fields}>{data.description}</div>
        <ul>
          {Object.entries(data.services).map(([key, value]) => {
            return value === "yes" ? (
              <li key={key}>
                <strong>
                  {key
                    .split("_")
                    .map(
                      (word) =>
                        word.charAt(0).toUpperCase() +
                        word.slice(1).toLowerCase()
                    )
                    .join(" ")}
                </strong>
              </li>
            ) : null;
          })}
        </ul>
      </div>
    </div>
  );
};

export default TourDetails;
