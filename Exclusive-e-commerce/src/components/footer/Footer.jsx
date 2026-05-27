import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Send } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-white mt-20">
      <div className="mx-auto w-full max-w-[1170px] px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h2 className="font-inter font-bold text-2xl mb-4">Exclusive</h2>
            <p className="text-gray-400 text-sm mb-5">Subscribe to get 10% off your first order</p>
            <div className="flex border border-gray-600 rounded-lg overflow-hidden">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-transparent px-3 py-2.5 text-sm text-white placeholder-gray-500 outline-none"
              />
              <button className="px-3 py-2.5 hover:bg-gray-800 transition">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-base mb-4">Support</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.</li>
              <li>exclusive@gmail.com</li>
              <li>+88015-88888-9999</li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="font-semibold text-base mb-4">Account</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              {[
                { label: "My Account", to: "/account" },
                { label: "Login / Register", to: "/login" },
                { label: "Cart", to: "/cart" },
                { label: "Shop", to: "/product" },
              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.to} className="hover:text-white transition">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Link */}
          <div>
            <h3 className="font-semibold text-base mb-4">Quick Link</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              {["Privacy Policy", "Terms Of Use", "FAQ", "Contact"].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-white transition">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Download App */}
          <div>
            <h3 className="font-semibold text-base mb-4">Download App</h3>
            <p className="text-gray-500 text-xs mb-3">Save $3 with App New User Only</p>
            <div className="flex gap-2 mb-5">
              <div className="w-20 h-20 bg-gray-800 rounded-lg flex items-center justify-center text-xs text-gray-500">
                QR Code
              </div>
              <div className="flex flex-col gap-2">
                <div className="bg-gray-800 rounded px-3 py-1.5 text-xs text-gray-400 hover:bg-gray-700 cursor-pointer transition">
                  Google Play
                </div>
                <div className="bg-gray-800 rounded px-3 py-1.5 text-xs text-gray-400 hover:bg-gray-700 cursor-pointer transition">
                  App Store
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-8 h-8 rounded-full border border-gray-600 flex items-center justify-center hover:border-white hover:text-white transition text-gray-400"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-sm text-gray-600">
          © {new Date().getFullYear()} Exclusive. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
