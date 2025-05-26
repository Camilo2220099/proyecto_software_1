import React, { useState } from "react";
import { toast } from "react-toastify";
import styles from "./styles.module.scss";

const LoginModal = ({ onLogin, onClose }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000";
      
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Inicio de sesión exitoso", { autoClose: 1000 });
        onLogin(data.token);
      } else {
        toast.error(data.message || "Error al iniciar sesión", { autoClose: 2000 });
      }
    } catch (error) {
      console.error("Error de autenticación:", error);
      
      if (formData.username === "admin" && formData.password === "admin123") {
        const fakeToken = "fake-jwt-token-" + Date.now();
        toast.success("Inicio de sesión exitoso (modo desarrollo)", { autoClose: 1000 });
        onLogin(fakeToken);
      } else {
        toast.error("Credenciales incorrectas", { autoClose: 2000 });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  return (
    <div className={styles.modalOverlay} onKeyDown={handleKeyDown} tabIndex={-1}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2>Iniciar Sesión - Administrador</h2>
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <div className={styles.inputGroup}>
            <label htmlFor="username">Usuario:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              autoFocus
              placeholder="Ingresa tu usuario"
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Ingresa tu contraseña"
            />
          </div>

          <div className={styles.buttonGroup}>
            <button 
              type="submit" 
              className={styles.loginButton}
              disabled={isLoading}
            >
              {isLoading ? "Iniciando..." : "Iniciar Sesión"}
            </button>
            <button 
              type="button" 
              className={styles.cancelButton}
              onClick={onClose}
            >
              Cancelar
            </button>
          </div>
        </form>

        <div className={styles.testCredentials}>
          <small>
            <strong>Para pruebas:</strong><br />
            Usuario: admin<br />
            Contraseña: admin123
          </small>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;