import styles from "./index.module.css";

const Loader = ({ stopSearch }) => (
  <div className={styles.loader_overlay}>
    <div className={styles.loader_wrapper}>
      <div className={styles.loader}></div>
      <button className={styles.cancel_button} onClick={stopSearch}>
        Cancel search
      </button>
    </div>
  </div>
);

export default Loader;
