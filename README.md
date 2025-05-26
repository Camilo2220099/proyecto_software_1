# E-Commerce App 🛒

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)

## 📋 Descripción

Esta es una aplicación de comercio electrónico full-stack desarrollada con Node.js, Express y MongoDB en el backend, y React en el frontend. Permite a los usuarios explorar productos, añadirlos al carrito y a los administradores gestionar el catálogo de productos (crear, actualizar, eliminar). Incluye autenticación básica para administradores y funcionalidades como vaciar el carrito.

## ✨ Características

### 👤 Vista de Usuario
- Listado de productos disponibles
- Añadir productos al carrito
- Gestionar la cantidad de productos en el carrito (incrementar/disminuir)
- Vaciar el carrito

### 🔐 Vista de Administrador
- Autenticación con usuario y contraseña
  - **Credenciales de prueba:** `admin` / `admin123`
- Crear, actualizar y eliminar productos en el catálogo

### 🔧 Funcionalidades Técnicas
- **Notificaciones:** Mensajes de éxito o error usando react-toastify
- **Persistencia:** Almacenamiento de productos y carrito en MongoDB
- **Validación:** Verificación de datos en el backend (URLs válidas, precios no negativos, etc.)

## 🛠️ Tecnologías Utilizadas

### Backend
- **Node.js y Express:** Framework para el servidor y manejo de rutas
- **MongoDB y Mongoose:** Base de datos NoSQL y ORM para modelado de datos
- **cors y dotenv:** Middleware para CORS y gestión de variables de entorno
- **validator:** Validación de URLs y otros datos

### Frontend
- **React:** Biblioteca para construir la interfaz de usuario
- **axios:** Para solicitudes HTTP al backend
- **react-toastify:** Para notificaciones en la interfaz
- **FontAwesome:** Iconos para la UI
- **SCSS:** Estilos modulares para los componentes

## 📋 Requisitos Previos

- [Node.js](https://nodejs.org/) (v16 o superior)
- [MongoDB](https://www.mongodb.com/) (local o en la nube, como MongoDB Atlas)
- Navegador web moderno

## 🚀 Instalación y Configuración

### 1. Clonar el Repositorio

```bash
git clone https://github.com/Camilo2220099/proyecto_software_1.git
cd proyecto_software_1
```

### 2. Configurar el Backend

```bash
# Navegar a la carpeta backend
cd backend

# Instalar dependencias
npm install

# Crear archivo .env con las siguientes variables:
# MONGODB_URI=<tu_uri_de_mongodb>

# Iniciar el servidor
node App.js
```

**Ejemplos de configuración de MongoDB:**
- **MongoDB Atlas:** `mongodb+srv://<usuario>:<contraseña>@cluster0.mongodb.net/ecommerce?retryWrites=true&w=majority`
- **MongoDB Local:** `mongodb://localhost:27017/ecommerce`

El servidor se ejecutará en [http://localhost:4000](http://localhost:4000)

### 3. Configurar el Frontend

```bash
# Navegar a la carpeta raíz del proyecto
cd ../

# Instalar dependencias
npm install

# Crear archivo .env con:
# REACT_APP_API_URL=http://localhost:4000

# Iniciar la aplicación
npm start
```

La aplicación se ejecutará en [http://localhost:3000](http://localhost:3000)

## 🧪 Cómo Probar la Aplicación

1. Abre [http://localhost:3000](http://localhost:3000) en tu navegador
2. Explora productos y añádelos al carrito
3. Haz clic en "Admin" y usa las credenciales: `admin` / `admin123`
4. Gestiona productos (crear, editar, eliminar) desde la vista de administrador

## 📁 Estructura del Proyecto

<details>
<summary>Ver estructura completa</summary>

### Backend
```
backend/
├── controllers/          # Lógica de negocio para las rutas
│   ├── AddProduct.js
│   ├── AddProductCart.js
│   ├── ClearCart.js
│   ├── DeleteProduct.js
│   ├── DeleteProductFromCatalog.js
│   ├── GetProducts.js
│   ├── GetProductsCart.js
│   ├── PutProduct.js
│   ├── UpdateProduct.js
│   ├── ValidateToken.js
│   └── index.js
├── database/             # Conexión a MongoDB
│   └── index.js
├── model/                # Esquemas de Mongoose
│   ├── Cart.js
│   └── Product.js
├── .env                  # Variables de entorno
├── .gitignore
├── App.js                # Configuración del servidor Express
└── package.json
```

### Frontend
```
src/
├── components/           # Componentes React
│   ├── Cart/
│   ├── Home/
│   ├── ItemCart/
│   ├── LoginModal/
│   ├── ProductAdmin/
│   └── Products/
├── context/              # Contexto para compartir estado
│   └── CartContext.jsx
├── App.jsx               # Componente raíz
├── App.scss              # Estilos globales
├── index.jsx             # Punto de entrada
└── .env                  # Variables de entorno
```
</details>

## 🔌 API Endpoints

### 📦 Productos
| Método | Endpoint | Descripción | Autenticación |
|--------|----------|-------------|---------------|
| `GET` | `/products` | Obtiene todos los productos | No |
| `POST` | `/products` | Crea un nuevo producto | Sí |
| `PUT` | `/products/:productId` | Actualiza un producto | Sí |
| `DELETE` | `/products/:productId` | Elimina un producto | Sí |

### 🛒 Carrito
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/products-cart` | Obtiene productos del carrito |
| `POST` | `/products-cart` | Añade producto al carrito |
| `PUT` | `/products-cart/:productId?query=add\|del` | Modifica cantidad |
| `DELETE` | `/products-cart/:productId` | Elimina producto del carrito |
| `DELETE` | `/cart` | Vacía todo el carrito |

## ⚠️ Notas Importantes

- **Autenticación:** Sistema de tokens ficticios para desarrollo. Para producción, implementar JWT con secreto seguro
- **Transacciones:** Operaciones críticas usan transacciones de Mongoose para consistencia
- **Testing:** Credenciales de prueba: `admin` / `admin123`

## 🚧 Roadmap / Mejoras Futuras

- [ ] Implementar JSON Web Tokens (JWT) con expiración
- [ ] Middleware de protección para rutas de administración
- [ ] Pruebas unitarias con Jest
- [ ] Migración a TypeScript
- [ ] Paginación y filtros para productos
- [ ] Sistema de usuarios múltiples
- [ ] Integración de pagos
- [ ] Notificaciones por email

## 📝 Licencia

Este proyecto es de uso educativo como parte del proyecto final del curso de Ingeniería de Software 1.

## 📧 Contacto

**Autor:** [Camilo2220099](https://github.com/Camilo2220099)

**Link del Proyecto:** [https://github.com/Camilo2220099/proyecto_software_1](https://github.com/Camilo2220099/proyecto_software_1)

---