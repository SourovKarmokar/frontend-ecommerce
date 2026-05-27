import { Outlet, useLocation } from "react-router";
import NavBar from "../components/navbar/NavBar";
import Footer from "../components/footer/Footer";

export default function RootLayout() {
  const location = useLocation();

  // Breadcrumb map
  const breadcrumbMap = {
    "/": "Home",
    "/product": "Shop",
    "/cart": "Cart",
    "/checkout": "Checkout",
    "/account": "My Account",
    "/wishlist": "Wishlist",
    "/contact": "Contact",
    "/about": "About",
    "/paymentsuccess": "Payment Success",
  };

  const pathSegments = location.pathname.split("/").filter(Boolean);
  const isHome = location.pathname === "/";

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <NavBar />

      {/* Breadcrumb */}
      {!isHome && (
        <div className="mx-auto w-full max-w-[1170px] px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-1.5 text-sm text-gray-400 font-poppins">
            <a href="/" className="hover:text-gray-600 transition">Home</a>
            {pathSegments.map((seg, i) => {
              const path = "/" + pathSegments.slice(0, i + 1).join("/");
              const label = breadcrumbMap[path] || seg.charAt(0).toUpperCase() + seg.slice(1);
              const isLast = i === pathSegments.length - 1;
              return (
                <span key={path} className="flex items-center gap-1.5">
                  <span>/</span>
                  {isLast ? (
                    <span className="text-gray-800 font-medium">{label}</span>
                  ) : (
                    <a href={path} className="hover:text-gray-600 transition">{label}</a>
                  )}
                </span>
              );
            })}
          </nav>
        </div>
      )}

      <main className="flex-1">
        <div className="mx-auto w-full max-w-[1170px] px-4 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
}
