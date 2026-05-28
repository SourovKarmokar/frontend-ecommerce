# Exclusive E-Commerce Frontend

Welcome to **Exclusive**, a premium modern client-facing e-commerce storefront web application. Built with **React**, **Redux Toolkit**, **Vite**, **Tailwind CSS**, and **DaisyUI**, it delivers an incredibly beautiful, fast, and seamless shopping experience.

---

## 🔗 Live Deployments & Repository

- **Vercel Live URL (Frontend)**: [https://exclusive-e-commerce-ruddy-nine.vercel.app](https://exclusive-e-commerce-ruddy-nine.vercel.app)
- **Vercel Live URL (Dashboard)**: [https://ecommerce-dashboard-six-lake.vercel.app](https://ecommerce-dashboard-six-lake.vercel.app)
- **GitHub Repository**: [https://github.com/SourovKarmokar/frontend-ecommerce](https://github.com/SourovKarmokar/frontend-ecommerce)

---

## ✨ Premium Features

- **Dynamic Homepage**: Features fully animated slider banners, real-time countdown flash sales, and modular category blocks.
- **Dynamic Category & Subcategory Navigation**: Features a dynamic side menu on the homepage that retrieves data from the backend, supporting beautiful nested subcategory hover popups.
- **Browse By Category Grid**: Dynamically renders core categories with smart, context-aware icons, allowing one-click filtering.
- **End-to-End Search & Filter Page**: A state-of-the-art products page integrated with `useSearchParams` that supports nested checkbox filtering by parent categories and subcategories, and pagination.
- **Interactive Cart & Checkout**: Integrated state management using Redux Toolkit for cart interactions, coupon handling, and checkout.
- **Secure Authentication**: Includes signup, login, and secure OTP verification views.

---

## 🛠️ Tech Stack

- **Framework / Build Tool**: React (v19) + Vite
- **Styling**: Tailwind CSS + DaisyUI (for sleek glassmorphism and modern UI elements)
- **State Management**: Redux Toolkit + React Redux
- **Icons**: Lucide React + React Icons
- **HTTP Client**: Axios (configured with central base URL)

---

## 🚀 Local Installation & Setup

Follow these simple steps to run the frontend application locally:

### 1. Prerequisites
Ensure you have **Node.js** (version 18 or above) installed on your system.

### 2. Navigate to Directory
```bash
cd "frontend-ecommerce/Exclusive-e-commerce"
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Configure Environment Variables
Verify or create a `.env` file in the project root:
```env
VITE_API_URL=http://localhost:5000
```

### 5. Start Development Server
```bash
npm run dev
```
The server will start running on **`http://localhost:5173`**. Open it in your web browser and enjoy!

---

## 🌐 Dynamic API Connection
This frontend is configured to seamlessly connect to the local backend running on port `5000`. It dynamically requests:
- `/api/v1/category/getallcategories` - Loads sidebar menu & categories grid.
- `/api/v1/product/getallproduct` - Loads flash sales, best sellers, and dynamic search/filter results.
