# 🛠️ Metal Management Backend

This is the backend server for the Metal Management application. It handles APIs related to purity, metal rate, authentication, and more. Built using Node.js, Express, MongoDB, and Mongoose, and deployed on Render with the database hosted on MongoDB Atlas.

## 🚀 Live Backend URL

[https://metal-backend-4llr.onrender.com] (https://metal-backend-4llr.onrender.com)

---

## 📂 Project Structure

metal-backend/
├── src/
│ ├── controllers/
│ ├── models/
│ ├── middleware/
│ ├── routes/
│ ├── utils/
│ └── app.js
├── .env
├── .gitignore
├── package.json
└── README.md


---


---

## ⚙️ Technologies Used

- Node.js
- Express.js
- MongoDB (with Mongoose)
- JWT (Authentication)
- Express-Validator (Validation)
- dotenv (Environment management)
- Render (Deployment)
- MongoDB Atlas (Cloud DB)

---

## 📦 Installation

### 1. Clone the repository

bash
git clone https://github.com/Jayaprakash11dev/metal-backend.git
cd metal-backend

2. Install dependencies

npm install

3. Create .env file

Create a .env file in the root directory and add the following:

PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key

✅ Don't forget to replace with your actual values.

🧪 Run the server

Development mode (with nodemon):

Production mode:

npm start

API Authentication

This project uses JWT authentication. For protected routes, pass the token in headers:

Authorization: Bearer <your_token>


📮 API Endpoints Overview


Method	   Endpoint	         Description

POST	/api/purities	     Add new purity (protected)
GET 	/api/purities	     Get all active purities
PUT 	/api/purities/:id	 Update purity by ID (protected)
DELETE	/api/purities/:id	 Soft delete purity (protected)
POST	/api/rates	         Add new metal rate (protected)
GET	    /api/rates/latest	 Get latest rate (protected)
GET 	/api/rates/history	 Get rate history (protected)
DELETE	/api/rates/:id	     Soft delete rate (protected)

More routes like login/register can be added based on your auth setup.

🛠️ Deployment

The backend is deployed using Render. Make sure to:

Add environment variables (MONGO_URI, JWT_SECRET) in Render dashboard.

Set build command: npm install

Set start command: npm start

📁 Environment Variables

| Key         | Required | Description                       |
| ----------- | -------- | --------------------------------- |
| PORT        | ✅        | Port for server (default 5000)    |
| MONGO\_URI  | ✅        | MongoDB Atlas connection string   |
| JWT\_SECRET | ✅        | Secret key for JWT authentication |


🙋‍♂️ Author
Jayaprakash M
GitHub: @Jayaprakash11dev