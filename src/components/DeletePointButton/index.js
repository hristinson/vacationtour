import styles from "./index.module.css";

const DeleteButton = ({ onClick }) => {
  return (
    <button className={styles.deleteButton} onClick={onClick}>
      &times;
    </button>
  );
};

export default DeleteButton;
