import { createBrowserRouter, RouterProvider } from "react-router";
import "./App.css";
import RootLayout from "./layout/Rootlayout";
import Home from "./pages/Home";
import Product from "./pages/Product";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import PaymentSuccess from "./pages/PaymentSuccess";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyOtp from "./pages/VerifyOtp";
import Account from "./pages/Account";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, Component: Home },
      { path: "/product", Component: Product },
      { path: "/productdetails/:id", Component: ProductDetails },
      { path: "/cart", Component: Cart },
      { path: "/checkout", Component: Checkout },
      { path: "/paymentsuccess", Component: PaymentSuccess },
      { path: "/account", Component: Account },
      { path: "/about", Component: About },
      { path: "/contact", Component: Contact },
      { path: "*", Component: NotFound },
    ],
  },
  { path: "/login", Component: Login },
  { path: "/signup", Component: Signup },
  { path: "/verify-otp", Component: VerifyOtp },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
