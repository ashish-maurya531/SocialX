# Social X Backend

Social X is a Node.js-based microservices backend for a modern social platform. This project is designed for local development without Docker, using Express, PostgreSQL, MongoDB, JWT authentication, and NGINX as a reverse proxy.

## 🧠 Tech Stack
- **Node.js + Express**: REST APIs for each service
- **PostgreSQL**: Used by user, post, and ecommerce services
- **MongoDB**: Used by chat service
- **JWT**: Authentication via gateway
- **NGINX**: Reverse proxy for routing

## 📁 Folder Structure
```
socialx-backend/
├── gateway-service/           # API gateway (JWT, proxy)
├── services/
│   ├── user-service/          # User management (PostgreSQL)
│   ├── post-service/          # Posts (PostgreSQL)
│   ├── chat-service/          # Real-time chat (MongoDB)
│   └── ecommerce-service/     # Ecommerce (PostgreSQL)
├── shared/                    # Shared utilities/constants
├── nginx/                     # NGINX config
├── db/                        # DB init scripts
```

## 🚀 Getting Started

### 1. Clone the repository
```sh
git clone <your-repo-url>
cd socialx-backend
```

### 2. Install dependencies for each service
```sh
cd gateway-service && npm install
cd ../services/user-service && npm install
cd ../services/post-service && npm install
cd ../services/chat-service && npm install
cd ../services/ecommerce-service && npm install
```

### 3. Set up databases
- **PostgreSQL**: Run the SQL scripts in `db/postgres-init/init.sql` to create databases and tables.
- **MongoDB**: Run the JS script in `db/mongo-init.js` to create the chat database and collection.

### 4. Configure environment variables
Each service has its own `.env` file. Example:
```
PORT=3001
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=socialx_user
JWT_SECRET=your_secret
```

### 5. Run all services
You can use [npm-run-all](https://www.npmjs.com/package/npm-run-all) or [concurrently](https://www.npmjs.com/package/concurrently) to run all services at once. Example script in root `package.json`:
```json
"scripts": {
  "gateway": "node gateway-service/src/server.js",
  "user": "node services/user-service/src/server.js",
  "post": "node services/post-service/src/server.js",
  "chat": "node services/chat-service/src/server.js",
  "ecommerce": "node services/ecommerce-service/src/server.js",
  "dev": "npm-run-all --parallel gateway user post chat ecommerce"
}
```
Then run:
```sh
npm run dev
```
Or start each service in its own terminal.

### 6. (Optional) Start NGINX
Use the config in `nginx/default.conf` to reverse proxy all services.

## 🛣️ API Overview
- **Gateway**: Handles JWT authentication and proxies requests to services
- **User Service**: `/` (get all users), `/health`
- **Post Service**: `/` (get all posts), `/health`
- **Chat Service**: `/health`, plus real-time via Socket.IO
- **Ecommerce Service**: `/` (get all products), `/health`

## 📝 Notes
- Each service runs on its own port (see `.env` files)
- Shared code is in the `shared/` folder
- Uploads (e.g., images) are stored in `services/post-service/uploads/`
- `.gitignore` files are set up to keep secrets and dependencies out of git

---

This is a starter foundation for a scalable, modern microservices backend. Expand each service as needed for your project!