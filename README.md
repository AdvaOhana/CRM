# 🚀 CRM System - Organization & Client Management

A comprehensive, full-stack CRM application designed to streamline organizational operations, manage user roles, and handle client data efficiently.

---

## 🌟 Key Features

* **Smart Authentication:**
    * Dual-mode registration: Internal (Admin-led) or External (New user registration).
    * Secure Login with JWT and HttpOnly Cookies.
* **Role-Based Access Control (RBAC):**
    * **Admin:** Full system control, user creation, and client management.
    * **Employee:** Access to client tools only, restricted from administrative tasks.
* **Client Management:**
    * Full CRUD operations for managing organization clients.
* **Tech Stack:**
    * **Frontend:** React 19, MUI, TanStack Query v5.
    * **Backend:** Node.js, Express v5, MongoDB.

---

## 🛠️ Tech Stack & Libraries

### Frontend
- **React 19** & **React Router 7**
- **TanStack Query (React Query):** For state-of-the-art server state management.
- **Material UI (MUI):** For a professional and responsive design.
- **React Hot Toast:** For beautiful, non-intrusive user feedback.

### Backend
- **Express.js:** Handling REST API endpoints.
- **MongoDB:** NoSQL database for flexible data storage.
- **Bcrypt:** Password hashing for security.
- **Joi:** Schema validation for incoming requests.

---

## 🔐 API & Hooks Architecture

The application utilizes **TanStack Query (v5)** for robust server-state management, featuring automated caching, retries, and request synchronization.

### 🛠️ Custom Hooks

#### **Authentication & Users**
| Hook | Type | Description |
| :--- | :--- | :--- |
| `useAuthQuery` | Query | Manages the global auth state with a 10m stale time. |
| `useLogin` / `useLogoutUser` | Mutation | Handles secure session management via HTTP-only cookies. |
| `useUsers` | Query | Fetches all system users (Admin view). |
| `useRegister` | Mutation | Creates a new user with role assignment. |
| `useUpdateUser` / `useDeleteUser` | Mutation | Administrative tools for managing team members. |

#### **Client Management**
| Hook | Type | Description |
| :--- | :--- | :--- |
| `useClients` | Query | Fetches client list with built-in 30s timeout protection. |
| `useAddClients` | Mutation | Validates and creates a new client record. |
| `useUpdateClients` | Mutation | Updates existing client data via PATCH. |
| `useDeleteClients` | Mutation | Deletes a client record after user confirmation. |



### 🌐 Key Endpoints

#### **User Routes (`/api/users`)**
- `POST /login` - Validates credentials and sets secure JWT cookie.
- `POST /logout` - Clears authentication session.
- `POST /register` - Registers a new user.
- `PATCH /updateUser/:id` - Updates user profile.
- `DELETE /deleteUser/:id` - Removes user from system.

#### **Client Routes (`/api/clients`)**
- `GET /` - Fetches all organization clients.
- `POST /addClient` - Creates a new client (Validated via Joi).
- `PATCH /updateClient/:id` - Updates specific client details.
- `DELETE /deleteClient/:id` - Removes client from database.

---

## ⚙️ Installation & Setup

### 1. Clone the repository
``` bash
git clone (https://github.com/AdvaOhana/CRM)
cd crm
```

### 2. Backend Setup
1. Navigate to the server folder:
``` bash
cd server
```

2. Install dependencies:
``` bash
npm install
```

3. Create a .env file:
``` env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
```

4. Start the server:
``` bash
npm start
```

### 3. Frontend Setup
1. Navigate to the frontend folder:
``` bash
cd customers
```

2. Install dependencies:
``` bash
npm install
```

3. Start the application:
``` bash
npm start
```
