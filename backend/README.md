# 🖧 Backend - Liga de Tenis API

## 🛠 Tech Stack

![image](https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) ![image](https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white) ![image](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white) ![image](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white) ![image](https://img.shields.io/badge/Express%20Validator-666766?style=for-the-badge) ![image](https://img.shields.io/badge/Insomnia-5849be?style=for-the-badge&logo=Insomnia&logoColor=white) ![image](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=Swagger&logoColor=white)

## 💻 Demo Backend

[🔗 Link to webiste](https://ligadetenis.onrender.com/)

## Environment Variables

Para ejecutar este proyecto se necesitan las siguientes variables que se deben agregar al archivo .env

`DATABASE_URL`: url para conectar Prisma con la base de datos

`PORT`: puerto en el que correra la API, por defecto es el 8080

`JWT_SECRET`: palabra secreta que usa JsonWebToken

`JWT_DURATION`: duracion del JsonWebToken

## Swagger Documentation

![image](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=Swagger&logoColor=white)
📄 [Documentation]()

## Postman Documentation

![image](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=Postman&logoColor=white)
📄 [Documentation]()

## Ejecutar localmente

Clonar el proyecto

```bash
  git clone https://github.com/julandrod/liga-de-tenis.git
```

Ir al directorio del proyecto

```bash
  cd liga-de-tenis
  cd backend
```

Instalar las dependencias

```bash
  npm install
```

Ejecutar el servidor

```bash
  npm run dev
```

Adicional la API cuenta con dos seeders, uno para los usuarios y otro para los torneos, se ejecutan en el siguiente orden

```bash
  npm run seed-users
```
```bash
  npm run seed-tournaments
```