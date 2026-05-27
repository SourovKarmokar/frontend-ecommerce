import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Dashboard from './components/Dashboard/Dashboard.jsx';
import DashboardHome from './components/Dashboard/DashboardHome.jsx';
import CreateProduct from './components/Product/CreateProduct.jsx';
import AllProduct from './components/Product/AllProduct.jsx';
import CreateCategory from './components/Category/CreateCategory.jsx';
import AllCategories from './components/Category/AllCategories.jsx';
import UpdateCategory from './components/Category/UpdateCategory.jsx';
import CreateSubCategory from './components/SubCategory/CreateSubCategory';
import AllSubCategories from './components/SubCategory/AllSubCategories';
import UpdateSubCategory from './components/SubCategory/UpdateSubCategory.jsx';
import Registration from './components/Authentication/Registration.jsx';
import VerifyOtp from './components/Authentication/VerifyOtp.jsx';
import Login from './components/Authentication/Login.jsx';
import ProtectedRoute from './components/Authentication/ProtectedRoute.jsx';
import AllOrders from './components/Orders/AllOrders.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
    children: [
      { index: true, Component: DashboardHome },
      { path: "/create-product", Component: CreateProduct },
      { path: "/all-product", Component: AllProduct },
      { path: "/create-category", Component: CreateCategory },
      { path: "/all-categories", Component: AllCategories },
      { path: "/update-category/:id", Component: UpdateCategory },
      { path: "/create-subcategory", Component: CreateSubCategory },
      { path: "/all-subcategories", Component: AllSubCategories },
      { path: "/update-subcategory/:id", Component: UpdateSubCategory },
      { path: "/all-orders", Component: AllOrders },
    ],
  },
  {
    path: "/registration",
    Component: Registration
  },
  {
    path: "/verify-otp",
    Component: VerifyOtp
  },
  {
    path: "/login",
    Component: Login
  },
]);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />,
)
