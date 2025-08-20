# 🛠️ Inventory API - Backend

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Jenkins](https://img.shields.io/badge/Jenkins-D24939?style=for-the-badge&logo=jenkins&logoColor=white)
![Linux](https://img.shields.io/badge/Linux-FCC624?style=for-the-badge&logo=linux&logoColor=black)
![Nginx](https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white)


Este es el **backend** del proyecto **Inventory App**, construido con **Express.js** 🚀 y **TypeScript**, listo para ser consumido por el frontend.

---

## ⚠️ Nota importante

Este proyecto es un **MVP (Producto Mínimo Viable)** creado **únicamente con fines de prueba técnica**.  
No está pensado para uso en producción ni incluye todas las funcionalidades completas.

---

## 🌟 Tecnologías y herramientas

- 🚀 **Node.js** - Runtime de JavaScript en el servidor  
- ⚡ **Express.js** - Framework minimalista para construir APIs y aplicaciones web  
- 📝 **TypeScript**  - Lenguaje base fuertemente tipado
- 🐬 **MySQL** - Base de datos relacional
- 📕 **Sequelize** - ORM
- 🐳 **Docker** - Herramienta de conteneirización 
- 🤖 **Jenkins** - Integración continua y despliegue automatizado (CI/CD)
- 🐧 **Linux**  - Sistema operativo del servidor de despliegue
- 🟩 **Nginx Proxy Manager**  - Reverse proxy

---

## 🔗 Repositorio del Frontend

El frontend de esta aplicación se encuentra en:  
[🖥️ Inventory Web App](https://github.com/Charly3012/inventory-web-app)  

---

## 🚀 Despliegue

El backend está **desplegado y accesible** en la ruta:  

[https://sunum.larchy.xyz/api](https://sunum.larchy.xyz/api)  


- Servido desde un **servidor Linux**  
- Manejado con **Nginx Proxy Manager** como reverse proxy  
- Contenedorizado con **Docker** para un despliegue seguro y estable  
- Hospedado en **Oracle Cloud** ☁️  
- Gestionado con **Cloudflare** para DNS y seguridad 🌐

---

## 🤖 CI/CD con Jenkins

Este proyecto cuenta con **integración continua y despliegue automático** usando **Jenkins**:

- 🔹 **Pipeline 1:** Build del backend  
  - Ejecuta el build de TypeScript y publicación den Docker Hub.  
- 🔹 **Pipeline 2:** Despliegue automático  
  - Publica la aplicación en el servidor Linux usando Docker y Nginx Proxy Manager.  

Esto permite que cualquier cambio en el repositorio se **pruebe y despliegue automáticamente**, manteniendo el backend siempre actualizado.

---

## 📝 Endpoints principales

### Productos
- `GET /api/v1/product/?limit=10&page=1&search=keyword` - Listar todos los productos con paginación
- `GET /api/v1/product/:id` - Obetner producto por id
- `POST /api/v1/product` - Crear un producto  
- `PUT /api/v1/product/:id` - Actualizar producto por id  
- `DELETE /api/v1/product/:id` - Eliminar producto por id  

### Categorías
- `GET /api/v1/category/?limit=10&page=1` - Listar todas las categorías con paginación
- `POST /api/v1/category` - Crear una categoría
- `PUT /api/v1/product/:id` - Actualizar producto por id  
- `DELETE /api/v1/product/:id` - Eliminar producto por id  

---

## ⚡ Estado del proyecto

![GitHub last commit](https://img.shields.io/github/last-commit/Charly3012/inventory-api?style=for-the-badge)
![GitHub repo size](https://img.shields.io/github/repo-size/Charly3012/inventory-api?style=for-the-badge)
![GitHub issues](https://img.shields.io/github/issues/Charly3012/inventory-api?style=for-the-badge)

