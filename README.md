# Despliegue de Aplicación Web con Docker Compose

Aplicación web de notas (MERN simplificado) desplegada con **Docker Compose**, compuesta por tres servicios:

| Servicio | Tecnología | Contenedor | Puerto |
|---|---|---|---|
| Base de datos | MongoDB 6 | `mongo_container` | 27017 |
| Backend (API) | Node.js 18 + Express + Mongoose | `backend_container` | 3000 |
| Frontend | React + Vite + Tailwind CSS | `frontend_container` | 5173 |

**Curso:** Servicios Convergentes – PhD. Daniel Jaramillo

## Repositorios

- Backend: https://github.com/GIANCA-MM/APPSC
- Frontend: https://github.com/TU_USUARIO/FAPPSC  <!-- reemplazar por la URL real -->

## Arquitectura

```
Navegador ──► frontend_container (5173) ──► backend_container (3000) ──► mongo_container (27017)
                         └──────────── red Docker: app_network (bridge) ────────────┘
```

Los tres contenedores comparten la red `app_network`. Dentro de esa red el backend se conecta a MongoDB usando el nombre del servicio (`mongo`) como hostname. El navegador accede al frontend y a la API a través de los puertos publicados en la máquina anfitriona.

## Requisitos previos

- Git
- Docker y Docker Compose

Instalación en Ubuntu:

```bash
sudo apt update
sudo apt install -y docker.io docker-compose git
sudo systemctl enable docker --now
sudo usermod -aG docker $USER
```

Cerrar sesión y volver a entrar para aplicar el permiso del grupo `docker`.

## Estructura del proyecto

```
Proyecto/
├── docker-compose.yml
├── APPSC/          # Backend (contiene su Dockerfile)
└── FAPPSC/         # Frontend (contiene su Dockerfile)
```

## Instrucciones de despliegue

### 1. Clonar los repositorios

```bash
mkdir Proyecto && cd Proyecto
git clone https://github.com/GIANCA-MM/APPSC.git
git clone https://github.com/TU_USUARIO/FAPPSC.git
```

### 2. Configuración del backend (`APPSC`)

**`APPSC/Dockerfile`**

```dockerfile
FROM node:18
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "src/index.js"]
```

**`APPSC/src/db.js`**

```js
import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI || "mongodb://admin:password123@mongo:27017/appdb?authSource=admin";

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Conectado a MongoDB");
  } catch (err) {
    console.error("Error de conexión:", err);
  }
};
```

**CORS (`APPSC/src/app.js`):** el `origin` debe coincidir exactamente con la URL desde la que se abre el frontend en el navegador (por defecto `http://localhost:5173`). Si se accede por la IP de la máquina, actualizar este valor.

### 3. Configuración del frontend (`FAPPSC`)

**`FAPPSC/Dockerfile`**

```dockerfile
FROM node:18
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]
```

**`FAPPSC/src/api/axios.js`** (la URL debe incluir el prefijo `/api`, ya que el backend monta allí sus rutas):

```js
import axios from "axios";

const instace = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

export default instace;
```

> Si la aplicación se abre desde otro equipo de la red, reemplazar `localhost` por la IP de la máquina donde corre Docker.

### 4. Archivo `docker-compose.yml` (en la raíz `Proyecto/`)

```yaml
version: "3.9"
services:
  mongo:
    image: mongo:6
    container_name: mongo_container
    restart: always
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: password123
    ports:
      - "27017:27017"
    networks:
      - app_network

  backend:
    build: ./APPSC
    container_name: backend_container
    restart: always
    volumes:
      - ./APPSC:/usr/src/app
      - /usr/src/app/node_modules
    working_dir: /usr/src/app
    environment:
      - MONGO_URI=mongodb://admin:password123@mongo:27017/appdb?authSource=admin
    ports:
      - "3000:3000"
    depends_on:
      - mongo
    networks:
      - app_network

  frontend:
    build: ./FAPPSC
    container_name: frontend_container
    restart: always
    command: ["npm", "run", "dev", "--", "--host"]
    volumes:
      - ./FAPPSC:/usr/src/app
      - /usr/src/app/node_modules
    working_dir: /usr/src/app
    ports:
      - "5173:5173"
    depends_on:
      - backend
    networks:
      - app_network

networks:
  app_network:
    driver: bridge
```

> La línea `- /usr/src/app/node_modules` evita que el montaje de la carpeta local sobrescriba las dependencias instaladas dentro de la imagen. Sin ella, los contenedores entran en bucle de reinicio.

### 5. Construir e iniciar los contenedores

```bash
cd Proyecto
docker compose up --build -d
```

### 6. Verificar que todo esté en ejecución

```bash
docker ps
```

Deben aparecer `mongo_container`, `backend_container` y `frontend_container` con estado `Up`.

Revisar que el backend conectó a la base de datos:

```bash
docker compose logs backend
```

Se espera ver `Conectado a MongoDB` y `Server on port 3000`.

## Acceso a los servicios

| Servicio | URL |
|---|---|
| Frontend | http://localhost:5173 |
| Backend (API) | http://localhost:3000/api |
| MongoDB | `mongodb://admin:password123@localhost:27017/` |

## Pruebas de funcionamiento

1. Abrir http://localhost:5173.
2. Registrar un usuario, iniciar sesión y crear una nota.
3. Verificar que los datos quedaron almacenados en MongoDB:

```bash
docker exec -it mongo_container mongosh -u admin -p password123 --authenticationDatabase admin
```

```js
use appdb
db.users.find().pretty()
db.notes.find().pretty()
```

### Endpoints principales de la API

| Método | Ruta | Descripción |
|---|---|---|
| POST | `/api/register` | Registrar usuario |
| POST | `/api/login` | Iniciar sesión |
| POST | `/api/logout` | Cerrar sesión |
| GET | `/api/profile` | Obtener perfil |
| GET | `/api/getNotes` | Listar notas |
| GET | `/api/getNote/:id` | Obtener una nota |
| POST | `/api/getNote` | Crear nota |
| PUT | `/api/getNote/:id` | Actualizar nota |
| DELETE | `/api/getNote/:id` | Eliminar nota |

## Comandos útiles

```bash
docker compose ps                      # estado de los servicios
docker compose logs -f backend         # logs del backend en tiempo real
docker compose logs frontend           # logs del frontend
docker compose restart backend         # reiniciar un servicio
docker compose down                    # detener y eliminar contenedores
docker compose up --build -d           # reconstruir e iniciar
```

## Solución de problemas

| Síntoma | Causa probable | Solución |
|---|---|---|
| Contenedor en `Restarting` con código 127 o error de módulo no encontrado | El volumen local sobrescribe `node_modules` | Agregar `- /usr/src/app/node_modules` a `volumes` y reconstruir |
| `does not provide an export named 'connectDB'` | `db.js` no exporta la función esperada por `index.js` | Usar la versión de `db.js` de este README |
| Error 404 en las peticiones del frontend | `baseURL` de axios sin el prefijo `/api` | Usar `http://localhost:3000/api` |
| Error de CORS en el navegador | `origin` en `app.js` no coincide con la URL del frontend | Ajustar el `origin` de `cors()` |
| `localhost:5173` no responde | Contenedor caído o puerto ocupado | Revisar `docker ps` y `docker compose logs frontend` |

## Autor

Proyecto desarrollado para la asignatura Servicios Convergentes.
