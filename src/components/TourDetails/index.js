import styles from "./index.module.css";

const TourDetails = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modal_overlay}>
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
                <strong>{key}</strong>
              </li>
            ) : null;
          })}
        </ul>
      </div>
    </div>
  );
};

export default TourDetails;
