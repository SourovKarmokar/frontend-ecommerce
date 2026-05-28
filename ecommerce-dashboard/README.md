# Exclusive E-Commerce Admin Dashboard

Welcome to the **Exclusive Admin Dashboard**, a secure, state-of-the-art web application for administrators to manage products, categories, subcategories, and customer orders in real-time.

---

## 🔗 Live Deployments & Repository

- **Vercel Live URL (Frontend)**: [https://exclusive-e-commerce-ruddy-nine.vercel.app](https://exclusive-e-commerce-ruddy-nine.vercel.app)
- **Vercel Live URL (Dashboard)**: [https://ecommerce-dashboard-six-lake.vercel.app](https://ecommerce-dashboard-six-lake.vercel.app)
- **GitHub Repository**: [https://github.com/SourovKarmokar/frontend-ecommerce](https://github.com/SourovKarmokar/frontend-ecommerce)

---

## 🔑 Admin Login Credentials

To access the dashboard, use the pre-seeded secure administrator account:
- **Email:** `admin@example.com`
- **Password:** `adminpassword123`
- **Required Role:** `admin` (pre-verified in database)

---

## ✨ Features

- **Dynamic Statistics & Analytics**: Instant overview of total products, categories, active subcategories, and pending orders.
- **Product Management**: Full CRUD interface to add, edit, or delete products, complete with Cloudinary image uploads, stock counts, rating configurations, and category mapping.
- **Category & Subcategory Management**: Form controls to create and organize categories and nested subcategories.
- **Order Management**: Real-time tracking of orders placed by customers, payment confirmations, and status updates.
- **Modern Dark & Sleek Design**: Beautifully designed UI with glowing gradient backdrops, high-end components, and glassmorphic layouts.

---

## 🛠️ Tech Stack

- **Framework / Build Tool**: React + Vite
- **Styling**: Tailwind CSS + Shadcn UI (custom animations & beautiful transitions)
- **HTTP Client**: Axios (pointing to local backend)
- **Router**: React Router DOM

---

## 🚀 Local Installation & Setup

Follow these simple steps to run the dashboard application locally:

### 1. Navigate to Directory
```bash
cd "frontend-ecommerce/ecommerce-dashboard"
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Verify or create a `.env` file in the project root:
```env
VITE_API_URL=http://localhost:5000
```

### 4. Start Development Server
```bash
npm run dev
```
The server will start running, usually on **`http://localhost:5174`** (if port 5173 is already in use by the frontend client). Open it in your web browser and sign in using the admin credentials!
