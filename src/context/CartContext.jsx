import { createContext, useEffect, useState, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000";

  const getProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`${API_URL}/products`);
      setProducts(data.products || []);
    } catch (error) {
      toast.error("Error al obtener los productos", { autoClose: 1000 });
      console.error("Error al obtener productos:", error);
    } finally {
      setIsLoading(false);
    }
  }, [API_URL]);

  const getProductsCart = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`${API_URL}/products-cart`);
      setCartItems(data.productsCart || []);
    } catch (error) {
      toast.error("Error al obtener el carrito", { autoClose: 1000 });
      console.error("Error al obtener el carrito:", error);
    } finally {
      setIsLoading(false);
    }
  }, [API_URL]);

  const addProduct = useCallback(async (product) => {
    setIsLoading(true);
    try {
      const { data } = await axios.post(`${API_URL}/products`, product);
      toast.success(data.message || "Producto creado exitosamente", { autoClose: 1000 });
      await getProducts();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error al crear el producto", {
        autoClose: 1000,
      });
      console.error("Error al crear el producto:", error);
    } finally {
      setIsLoading(false);
    }
  }, [API_URL, getProducts]);

  const updateProduct = useCallback(async (id, product) => {
    setIsLoading(true);
    try {
      const { data } = await axios.put(`${API_URL}/products/${id}`, product);
      toast.success(data.message || "Producto actualizado exitosamente", { autoClose: 1000 });
      await Promise.all([getProducts(), getProductsCart()]);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error al actualizar el producto", {
        autoClose: 1000,
      });
      console.error("Error al actualizar el producto:", error);
    } finally {
      setIsLoading(false);
    }
  }, [API_URL, getProducts, getProductsCart]);

  const deleteProduct = useCallback(async (id) => {
    setIsLoading(true);
    try {
      const { data } = await axios.delete(`${API_URL}/products/${id}`);
      toast.success(data.message || "Producto eliminado exitosamente", { autoClose: 1000 });
      await Promise.all([getProducts(), getProductsCart()]);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error al eliminar el producto", {
        autoClose: 1000,
      });
      console.error("Error al eliminar el producto:", error);
    } finally {
      setIsLoading(false);
    }
  }, [API_URL, getProducts, getProductsCart]);

  const addItemToCart = useCallback(async (product) => {
    setIsLoading(true);
    const { name, img, price } = product;
    try {
      const { data } = await axios.post(`${API_URL}/products-cart`, { name, img, price });
      toast.success(data.message || "Producto agregado al carrito", { autoClose: 1000 });
      await Promise.all([getProducts(), getProductsCart()]);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error al agregar al carrito", {
        autoClose: 1000,
      });
      console.error("Error al agregar al carrito:", error);
    } finally {
      setIsLoading(false);
    }
  }, [API_URL, getProducts, getProductsCart]);

  const editItemToCart = useCallback(async (id, query, amount) => {
    setIsLoading(true);
    try {
      if (query === "del" && amount === 1) {
        const { data } = await axios.delete(`${API_URL}/products-cart/${id}`);
        toast.success(data.message || "Producto eliminado del carrito", { autoClose: 1000 });
      } else {
        const { data } = await axios.put(`${API_URL}/products-cart/${id}?query=${query}`, {
          amount,
        });
        toast.success(data.message || "Carrito actualizado", { autoClose: 1000 });
      }
      await Promise.all([getProducts(), getProductsCart()]);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error al editar el carrito", {
        autoClose: 1000,
      });
      console.error("Error al editar el carrito:", error);
    } finally {
      setIsLoading(false);
    }
  }, [API_URL, getProducts, getProductsCart]);

  const clearCart = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.delete(`${API_URL}/cart`);
      toast.success(data.message || "Carrito vaciado exitosamente", { autoClose: 1000 });
      await Promise.all([getProducts(), getProductsCart()]);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error al vaciar el carrito", {
        autoClose: 1000,
      });
      console.error("Error al vaciar el carrito:", error);
    } finally {
      setIsLoading(false);
    }
  }, [API_URL, getProducts, getProductsCart]);

  useEffect(() => {
    getProducts();
    getProductsCart();
  }, [getProducts, getProductsCart]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        products,
        addItemToCart,
        editItemToCart,
        addProduct,
        updateProduct,
        deleteProduct,
        clearCart,
        isLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;