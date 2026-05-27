import { useState } from "react";
import { Heart, ShoppingCart, Search, User, Menu, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../slice/authSlice";
import { clearCart } from "../../slice/cartSlice";

const navLinks = [
  { id: 1, name: "Home", path: "/" },
  { id: 2, name: "Contact", path: "/contact" },
  { id: 3, name: "About", path: "/about" },
  { id: 4, name: "Sign Up", path: "/signup" },
];

export default function Navbar() {
  const location = useLocation();
  const cartData = useSelector((state) => state.cartInfo.value);
  const wishlist = useSelector((state) => state.wishlist?.items || []);
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(clearCart());
    setUserMenuOpen(false);
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/product?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setMobileOpen(false);
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-black text-white text-center py-3 px-4 text-xs sm:text-sm relative">
        <span>
          Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!{" "}
          <Link to="/product" className="font-bold underline hover:text-gray-300 transition">
            ShopNow
          </Link>
        </span>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-1 text-xs">
          <span>English</span>
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="mx-auto max-w-[1170px] px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <span className="font-inter font-bold text-xl md:text-2xl text-black tracking-tight">
                Exclusive
              </span>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-8 lg:gap-12">
              {navLinks.map((link) => (
                <Link
                  key={link.id}
                  to={link.path}
                  className={`font-poppins text-sm lg:text-base transition-all duration-200 relative group ${
                    isActive(link.path)
                      ? "text-black font-medium"
                      : "text-gray-700 hover:text-black"
                  }`}
                >
                  {link.name}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-black transition-all duration-200 ${
                      isActive(link.path) ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              ))}
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center gap-3 md:gap-4">
              {/* Search */}
              <form onSubmit={handleSearch} className="relative hidden lg:block">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="What are you looking for?"
                  className="w-44 xl:w-56 py-2 pl-4 pr-9 text-xs font-poppins bg-[#F5F5F5] rounded-sm focus:outline-none focus:ring-1 focus:ring-gray-300"
                />
                <button type="submit" className="absolute right-2.5 top-1/2 -translate-y-1/2">
                  <Search className="w-4 h-4 text-gray-500" />
                </button>
              </form>

              {/* Wishlist */}
              <Link to="/wishlist" className="relative hidden sm:block hover:text-secondary transition-colors">
                <Heart className="w-5 h-5 md:w-6 md:h-6" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-secondary text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link to="/cart" className="relative hover:text-secondary transition-colors">
                <ShoppingCart className="w-5 h-5 md:w-6 md:h-6" />
                {cartData.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-secondary text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {cartData.length}
                  </span>
                )}
              </Link>

              {/* User */}
              <div className="relative">
                {isLoggedIn ? (
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                  >
                    <span className="text-white text-xs font-bold">
                      {user?.firstName?.[0]?.toUpperCase()}
                    </span>
                  </button>
                ) : (
                  <Link to="/login" className="hover:text-secondary transition-colors">
                    <User className="w-5 h-5 md:w-6 md:h-6" />
                  </Link>
                )}

                {/* Dropdown */}
                {userMenuOpen && isLoggedIn && (
                  <div className="absolute right-0 top-11 w-52 bg-white rounded-lg shadow-xl border border-gray-100 z-50 overflow-hidden">
                    <div className="px-4 py-3 bg-gray-50 border-b">
                      <p className="font-semibold text-sm text-gray-800 truncate">
                        {user?.firstName} {user?.lastName}
                      </p>
                      <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                    </div>
                    {[
                      { label: "My Account", to: "/account" },
                      { label: "My Cart", to: "/cart" },
                      { label: "My Wishlist", to: "/wishlist" },
                    ].map((item) => (
                      <Link
                        key={item.label}
                        to={item.to}
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        {item.label}
                      </Link>
                    ))}
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-secondary hover:bg-red-50 transition-colors border-t"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile Toggle */}
              <button
                className="md:hidden hover:text-secondary transition-colors"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileOpen && (
            <div className="md:hidden border-t border-gray-100 py-4 space-y-3 bg-white">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full py-2.5 pl-4 pr-10 text-sm bg-[#F5F5F5] rounded-sm focus:outline-none"
                />
                <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2">
                  <Search className="w-4 h-4 text-gray-500" />
                </button>
              </form>

              {navLinks.map((link) => (
                <Link
                  key={link.id}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={`block py-2 text-sm font-poppins transition-colors ${
                    isActive(link.path) ? "text-secondary font-medium" : "text-gray-700 hover:text-secondary"
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              <div className="flex gap-3 pt-2 border-t border-gray-100">
                <Link
                  to="/wishlist"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-secondary"
                >
                  <Heart className="w-4 h-4" /> Wishlist
                </Link>
              </div>

              {!isLoggedIn ? (
                <div className="flex gap-3 pt-1">
                  <Link
                    to="/login"
                    onClick={() => setMobileOpen(false)}
                    className="flex-1 text-center bg-secondary text-white py-2.5 rounded text-sm font-medium hover:bg-red-600 transition"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setMobileOpen(false)}
                    className="flex-1 text-center border border-secondary text-secondary py-2.5 rounded text-sm font-medium hover:bg-red-50 transition"
                  >
                    Sign Up
                  </Link>
                </div>
              ) : (
                <div className="pt-2 border-t border-gray-100 space-y-2">
                  <p className="text-sm font-medium text-gray-700">
                    Hello, {user?.firstName}!
                  </p>
                  <Link
                    to="/account"
                    onClick={() => setMobileOpen(false)}
                    className="block text-sm text-gray-600 hover:text-secondary py-1"
                  >
                    My Account
                  </Link>
                  <button
                    onClick={() => { handleLogout(); setMobileOpen(false); }}
                    className="text-sm text-secondary font-medium"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* Close dropdown on outside click */}
      {userMenuOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
      )}
    </>
  );
}
