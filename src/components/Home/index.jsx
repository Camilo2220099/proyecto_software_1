import React, { useState, useEffect } from "react";
import Cart from "../Cart";
import Products from "../Products";
import ProductAdmin from "../ProductAdmin";
import LoginModal from "../LoginModal";
import styles from "./styles.module.scss";
import axios from "axios";
import { toast } from "react-toastify";

const Home = () => {
  const [isAdminView, setIsAdminView] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000";

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      axios
        .post(`${API_URL}/auth/validate-token`, { token })
        .then((response) => {
          if (response.data.error) {
            toast.error(response.data.message || "Sesión inválida", { autoClose: 2000 });
            localStorage.removeItem("adminToken");
            setIsAuthenticated(false);
            setIsAdminView(false);
          } else {
            setIsAuthenticated(true);
          }
        })
        .catch((error) => {
          console.error("Error al validar el token:", error);
          toast.error("Error al validar la sesión", { autoClose: 2000 });
          localStorage.removeItem("adminToken");
          setIsAuthenticated(false);
          setIsAdminView(false);
        });
    }
  }, [API_URL]);

  const handleAdminClick = () => {
    if (isAuthenticated) {
      setIsAdminView(!isAdminView);
    } else {
      setShowLoginModal(true);
    }
  };

  const handleLogin = (token) => {
    localStorage.setItem("adminToken", token);
    setIsAuthenticated(true);
    setShowLoginModal(false);
    setIsAdminView(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setIsAuthenticated(false);
    setIsAdminView(false);
    toast.success("Sesión cerrada exitosamente", { autoClose: 1000 });
  };

  return (
    <div className={styles.home}>
      <div className={styles.header}>
        <button
          className={styles.adminButton}
          onClick={handleAdminClick}
          style={{ display: "flex", alignItems: "center", gap: "8px" }}
        >
          {isAuthenticated ? (
            isAdminView ? (
              "Cerrar Admin"
            ) : (
              "Admin"
            )
          ) : (
            <>
              <i className="fa-duotone fa-solid fa-arrow-right-to-bracket"></i>
              <span>Admin</span>
            </>
          )}
        </button>

        {isAuthenticated && isAdminView && (
          <button className={styles.logoutButton} onClick={handleLogout}>
            Cerrar Sesión
          </button>
        )}

        {!isAdminView && <Cart />}
      </div>

      {isAdminView && isAuthenticated ? <ProductAdmin /> : <Products />}

      {showLoginModal && (
        <LoginModal onLogin={handleLogin} onClose={() => setShowLoginModal(false)} />
      )}
    </div>
  );
};

export default Home;