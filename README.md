
# **Shopcart - E-Commerce Site**

Shop Cart is a modern, responsive e-commerce platform built for **Crystal Delta** by teammate **"Arunbalaji (CSE)" and "Sivasabitha (IT)"** using the **MERN stack** (MongoDB, Express.js, React.js, Node.js). It allows users to browse a wide range of products, manage their shopping cart, and place orders. The platform also includes an admin panel for managing products, orders, and users.



## Features:
- **Product Browsing**: Users can view a variety of products, filter by categories, and sort based on price or popularity.
- **User Authentication**: Users can register, log in, and manage their accounts.
- **Shopping Cart**: Add products to the shopping cart and proceed to checkout.
- **Order Management**: Users can view their order history and track orders.
- **Admin Dashboard**: Admins can add, update, or delete products, manage orders, and oversee users.

## Tech Stack:
- **Frontend**: React.js (Vite.js), Redux for state management
- **Backend**: Node.js, Express.js
- **Database**: MongoDB

## **Project Setup**

### **Prerequisites**
- Node.js 
- MongoDB (local and cloud setup with Atlas and compass)
- npm 

### Install dependencies for frontend and backend separately
**Tip:** To efficiently install dependencies for the frontend, admin, and backend simultaneously, use split terminals.

**Install frontend dependencies**
```bash
cd ShopCart_Ecommerce/frontend
npm install
```

**Install admin dependencies**
```bash
cd ShopCart_Ecommerce/admin
npm install
```

**Install backend dependencies**
```bash
cd ShopCart_Ecommerce/backend
npm install
```

### Environment Variables
**Backend**
- Create a `.env` file in the `backend` directory.
- Add the following variables with appropriate values:

```bash
MONGODB_URI = ''
CLOUDINARY_API_KEY = ""
CLOUDINARY_SECRET_KEY = ""
CLOUDINARY_NAME = ""
JWT_SECRET = ""
ADMIN_EMAIL = ""
ADMIN_PASSWORD = ""
STRIPE_SECRET_KEY = ""
```

**Frontend & Admin**
- Create a `.env` file in the `frontend & Admin` directories.
- Add the following variable:
```bash
# Backend URL (adjust if needed change the port number)
VITE_BACKEND_URL="http://localhost:4000"
```

**Important**
- Replace placeholders with your actual values.
- Exclude the `.env` file from version control to protect sensitive information.

### Starting the Application

#### **Important Notes:**
- Use separate terminals: Run the commands in separate terminal windows or use `split terminal` to avoid conflicts.
- Install `nodemon`: Ensure you have `nodemon` installed globally to run the backend development servers using `npm run dev`. Install it with:
```bash
npm install -g nodemon
```

#### **Start the backend server:**
- Navigate to the `backend` directory: `cd backend`
- Start the server: `npm run server`
- You should see a message indicating the server is running, usually on port 4000 or specified in the PORT environment variable inside the `.env` file.

#### **Start the frontend server:**
- Navigate to the `frontend` directory: `cd frontend`
- Start the server: `npm run dev`

#### **Start the admin server:**
- Navigate to the `admin` directory: `cd admin`
- Start the server: `npm run dev`

### Unit test
Unit test is done .

![WhatsApp Image 2024-12-31 at 3 41 01 PM](https://github.com/user-attachments/assets/56f1f3e0-d1d8-407e-8f23-a8b13ac43663)



