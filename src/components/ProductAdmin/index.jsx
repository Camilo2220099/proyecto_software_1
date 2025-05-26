import React, { useState, useContext } from "react";
import CartContext from "../../context/CartContext";
import styles from "./styles.module.scss";

const ProductAdmin = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useContext(CartContext);
  const [formData, setFormData] = useState({ name: "", img: "", price: "" });
  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.img || !formData.price) {
      alert("Por favor, completa todos los campos");
      return;
    }

    if (editId) {
      await updateProduct(editId, formData);
      setEditId(null);
    } else {
      await addProduct(formData);
    }
    setFormData({ name: "", img: "", price: "" });
  };

  const handleEdit = (product) => {
    setFormData({ name: product.name, img: product.img, price: product.price });
    setEditId(product._id);
  };

  return (
    <div className={styles.productAdmin}>
      <div className={styles.formSection}>
        <h2>{editId ? "Editar Producto" : "Agregar Producto"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nombre del producto"
          />
          <input
            type="text"
            name="img"
            value={formData.img}
            onChange={handleChange}
            placeholder="URL de la imagen"
          />
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Precio"
          />
          <button type="submit">{editId ? "Actualizar" : "Agregar"}</button>
          {editId && (
            <button
              type="button"
              onClick={() => setEditId(null) || setFormData({ name: "", img: "", price: "" })}
            >
              Cancelar
            </button>
          )}
        </form>
      </div>
      <div className={styles.listSection}>
        <h2>Lista de Productos</h2>
        <div className={styles.productList}>
          {products.length === 0 ? (
            <p>No hay productos. ¡Crea uno usando el formulario!</p>
          ) : (
            products.map((product) => (
              <div key={product._id} className={styles.productItem}>
                <div className={styles.productDetails}>
                  <p className={styles.productName}>{product.name}</p>
                  <p className={styles.productPrice}>${product.price}</p>
                </div>
                <div className={styles.actionButtons}>
                  <button onClick={() => handleEdit(product)}>Editar</button>
                  <button onClick={() => deleteProduct(product._id)}>Eliminar</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductAdmin;