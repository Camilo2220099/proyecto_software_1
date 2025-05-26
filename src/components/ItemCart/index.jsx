import React, { useContext } from "react";
import CartContext from "../../context/CartContext";
import styles from "./styles.module.scss";

export const ItemCart = ({ item }) => {
  const { editItemToCart, isLoading } = useContext(CartContext);
  const { amount, _id } = item;

  return (
    <div className={styles.cartItem}>
      <img src={item.img} alt={item.name} />
      <div className={styles.dataContainer}>
        <div className={styles.left}>
          <p>{item.name}</p>
          <div className={styles.buttons}>
            <button
              className={styles.addButton}
              onClick={() => editItemToCart(_id, "add", amount)}
              disabled={isLoading}
            >
              {isLoading ? "..." : "+"}
            </button>
            <button
              className={styles.removeButton}
              onClick={() => editItemToCart(_id, "del", amount)}
              disabled={isLoading}
            >
              {isLoading ? "..." : "-"}
            </button>
          </div>
        </div>
        <div className={styles.right}>
          <div>{item.amount}</div>
          <p>Total: ${item.amount * item.price}</p>
        </div>
      </div>
    </div>
  );
};