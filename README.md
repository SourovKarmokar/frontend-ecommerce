# E-Commerce Frontend & Dashboard (frontend-ecommerce)

This repository contains both the client-facing storefront and the administrative dashboard for the e-commerce application. Both are built using **React**, **Vite**, **Redux**, and styled using modern CSS.

## Project Structure

- **[Exclusive-e-commerce](./Exclusive-e-commerce)**: The customer-facing storefront built with React and Vite. It allows clients to browse products, view details, search, add products to the cart/wishlist, and checkout using SSLCommerz.
- **[ecommerce-dashboard](./ecommerce-dashboard)**: The admin dashboard for managing categories, subcategories, products, and administrative settings.

---

## Directory Overview

```
frontend-ecommerce/
+-- Exclusive-e-commerce/   # React Client Storefront
¦   +-- src/                # Source code
¦   +-- public/             # Static public assets
¦   +-- vercel.json         # Vercel client config
¦   +-- package.json        # Dependencies & scripts
¦   +-- vite.config.js      # Vite config
+-- ecommerce-dashboard/    # React Administrative Dashboard
¦   +-- src/                # Source code
¦   +-- public/             # Static public assets
¦   +-- vercel.json         # Vercel dashboard config
¦   +-- package.json        # Dependencies & scripts
¦   +-- vite.config.js      # Vite config
+-- .gitignore              # Root gitignore rules
+-- README.md               # Main instructions
```

---

## Local Setup & Development

### 1. Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (version >=18.0.0 is recommended).

### 2. Storefront (Exclusive-e-commerce)
1. Navigate to the storefront directory:
   ```bash
   cd Exclusive-e-commerce
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file (see `.env.production` or configure locally):
   ```env
   VITE_API_URL=http://localhost:5000
   ```
4. Run in development mode:
   ```bash
   npm run dev
   ```

### 3. Dashboard (ecommerce-dashboard)
1. Navigate to the dashboard directory:
   ```bash
   cd ../ecommerce-dashboard
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file:
   ```env
   VITE_API_URL=http://localhost:5000
   ```
4. Run in development mode:
   ```bash
   npm run dev
   ```

---

## Live Deployment on Vercel ??

Since this repository contains both projects in subdirectories, you can deploy them as **two separate projects on Vercel** using the same GitHub repository.

### Step-by-Step Vercel Deployment

#### ?? Deploy Project 1: The Storefront (`Exclusive-e-commerce`)
1. Go to the [Vercel Dashboard](https://vercel.com/dashboard) and click **"Add New"** > **"Project"**.
2. Import your `frontend-ecommerce` repository.
3. In the **Configure Project** step:
   - **Project Name**: `exclusive-storefront`
   - **Framework Preset**: Select **Vite** (Vercel automatically detects this).
   - **Root Directory**: Click "Edit" and choose **`Exclusive-e-commerce`**.
4. Expand the **Environment Variables** section and add:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://your-backend.onrender.com` (Your live Render backend API base URL)
5. Click **"Deploy"**.

#### ?? Deploy Project 2: The Dashboard (`ecommerce-dashboard`)
1. In the Vercel Dashboard, click **"Add New"** > **"Project"** again.
2. Import the same `frontend-ecommerce` repository.
3. In the **Configure Project** step:
   - **Project Name**: `ecommerce-admin-dashboard`
   - **Framework Preset**: Select **Vite**.
   - **Root Directory**: Click "Edit" and choose **`ecommerce-dashboard`**.
4. Expand the **Environment Variables** section and add:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://your-backend.onrender.com` (Your live Render backend API base URL)
5. Click **"Deploy"**.

---

### SPA Router Configuration on Vercel

Both sub-projects include a `vercel.json` file containing:
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```
**Why this is important:** React uses client-side routing (React Router). This configuration ensures Vercel redirects all deep page URLs (e.g. `/login`, `/dashboard/products`, `/cart`) to the root `index.html` file, letting React Router handle page routing without showing **404 Page Not Found** errors on refresh.
