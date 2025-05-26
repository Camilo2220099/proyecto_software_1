import React, { useContext } from "react";
import CartContext from "../../context/CartContext";
import styles from "./styles.module.scss";

const Products = () => {
  const { products, addItemToCart } = useContext(CartContext);

  return (
    <div className={styles.products}>
      <h2>Productos</h2>
      {products.length === 0 ? (
        <p>No hay productos disponibles. Por favor, crea algunos en la sección de administración.</p>
      ) : (
        <div className={styles.productsContainer}>
          {products.map((product) => (
            <div key={product._id} className={styles.productCard}>
              <div className={styles.productImage}>
                <img src={product.img} alt={product.name} />
              </div>
              <div className={styles.productInfo}>
                <h3>{product.name}</h3>
                <p className={styles.price}>${product.price}</p>
              </div>
              <div className={styles.productActions}>
                {product.inCart ? (
                  <button className={styles.inCartButton} disabled>
                    En el carrito
                  </button>
                ) : (
                  <button
                    className={styles.addToCartButton}
                    onClick={() => addItemToCart(product)}
                  >
                    <i className="fas fa-cart-plus"></i> Añadir al carrito.
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;