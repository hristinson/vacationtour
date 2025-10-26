import styles from "./index.module.css";

const DeleteButton = ({ onClick }) => {
  return (
    <button className={styles.deleteButton} onClick={onClick} type="button">
      &times;
    </button>
  );
};

export default DeleteButton;
