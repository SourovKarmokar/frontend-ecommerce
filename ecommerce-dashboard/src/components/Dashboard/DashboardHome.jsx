import API_BASE_URL from '../../config/api';
import { useEffect, useState } from "react";
import axios from "axios";
import { ShoppingBag, Users, Package, TrendingUp, Clock, CheckCircle } from "lucide-react";

const StatCard = ({ title, value, icon: Icon, color, bg }) => (
  <div className={`${bg} rounded-xl p-5 flex items-center gap-4 shadow-sm`}>
    <div className={`${color} p-3 rounded-lg`}>
      <Icon className="w-6 h-6 text-white" />
    </div>
    <div>
      <p className="text-sm text-gray-500 font-medium">{title}</p>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  </div>
);

export default function DashboardHome() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const { data } = await axios.get(
        `${API_BASE_URL}/api/v1/admin/stats`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setStats(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-400 text-lg">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
        <p className="text-gray-500 text-sm mt-1">Welcome back, Admin!</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <StatCard
          title="Total Users"
          value={stats?.totalUsers ?? 0}
          icon={Users}
          color="bg-blue-500"
          bg="bg-blue-50"
        />
        <StatCard
          title="Total Products"
          value={stats?.totalProducts ?? 0}
          icon={Package}
          color="bg-purple-500"
          bg="bg-purple-50"
        />
        <StatCard
          title="Total Orders"
          value={stats?.totalOrders ?? 0}
          icon={ShoppingBag}
          color="bg-orange-500"
          bg="bg-orange-50"
        />
        <StatCard
          title="Total Revenue"
          value={`৳${(stats?.totalRevenue ?? 0).toFixed(2)}`}
          icon={TrendingUp}
          color="bg-green-500"
          bg="bg-green-50"
        />
        <StatCard
          title="Pending Orders"
          value={stats?.pendingOrders ?? 0}
          icon={Clock}
          color="bg-yellow-500"
          bg="bg-yellow-50"
        />
        <StatCard
          title="Completed Orders"
          value={stats?.completedOrders ?? 0}
          icon={CheckCircle}
          color="bg-teal-500"
          bg="bg-teal-50"
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm p-5 border">
        <h2 className="text-lg font-semibold text-gray-700 mb-3">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Add Product", href: "/create-product", color: "bg-blue-600" },
            { label: "Add Category", href: "/create-category", color: "bg-purple-600" },
            { label: "View Orders", href: "/all-orders", color: "bg-orange-600" },
            { label: "All Products", href: "/all-product", color: "bg-green-600" },
          ].map((action) => (
            <a
              key={action.label}
              href={action.href}
              className={`${action.color} text-white text-sm font-medium py-2.5 px-4 rounded-lg text-center hover:opacity-90 transition`}
            >
              {action.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
