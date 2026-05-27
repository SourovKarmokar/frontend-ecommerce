import API_BASE_URL from '../../config/api';
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const statusColors = {
  Pending: "bg-yellow-100 text-yellow-700",
  Completed: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
  Processing: "bg-blue-100 text-blue-700",
};

export default function AllOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [expandedOrder, setExpandedOrder] = useState(null);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${API_BASE_URL}/api/v1/order/getallorders`
      );
      setOrders(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.patch(`http://localhost:5000/api/v1/order/updatestatus/${id}`, {
        paymentStatus: newStatus,
      });
      setMessage(`Order status updated to ${newStatus}`);
      fetchOrders();
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("Failed to update status.");
    }
  };

  return (
    <div className="mx-4 md:mx-10 py-4">
      <h2 className="text-xl font-bold mb-4">All Orders ({orders.length})</h2>

      {message && (
        <div className={`mb-4 p-3 rounded text-sm ${message.includes("Failed") ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
          {message}
        </div>
      )}

      {/* Product Details Modal */}
      {expandedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-lg max-h-[80vh] overflow-y-auto">
            <h3 className="text-lg font-bold mb-4">Order Details</h3>
            <div className="mb-3 text-sm space-y-1">
              <p><span className="font-medium">Customer:</span> {expandedOrder.firstName} {expandedOrder.lastName}</p>
              <p><span className="font-medium">Email:</span> {expandedOrder.email}</p>
              <p><span className="font-medium">Phone:</span> {expandedOrder.phone}</p>
              <p><span className="font-medium">Address:</span> {expandedOrder.address}, {expandedOrder.city} - {expandedOrder.postcode}</p>
              <p><span className="font-medium">Transaction ID:</span> {expandedOrder.transactionId}</p>
              <p><span className="font-medium">Total:</span> ৳{expandedOrder.totalPrice}</p>
            </div>
            <h4 className="font-semibold mb-2">Products:</h4>
            <div className="space-y-2">
              {expandedOrder.products?.map((p, i) => (
                <div key={i} className="flex items-center gap-3 border rounded p-2">
                  <img src={p.image} alt={p.name} className="w-12 h-12 object-cover rounded" />
                  <div>
                    <p className="font-medium text-sm">{p.name}</p>
                    <p className="text-xs text-gray-500">Qty: {p.cartQun} × ৳{p.price}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button className="mt-4 w-full" variant="outline" onClick={() => setExpandedOrder(null)}>
              Close
            </Button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-center py-10 text-gray-500">Loading orders...</div>
      ) : orders.length === 0 ? (
        <div className="text-center py-10 text-gray-400">No orders found.</div>
      ) : (
        <div className="shadow rounded overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sr.</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order, index) => (
                <TableRow key={order._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className="font-medium">
                    {order.firstName} {order.lastName}
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">{order.email}</TableCell>
                  <TableCell className="font-semibold">৳{order.totalPrice}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[order.paymentStatus] || "bg-gray-100 text-gray-600"}`}>
                      {order.paymentStatus}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm text-gray-500">
                    {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "N/A"}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1 flex-wrap">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setExpandedOrder(order)}
                      >
                        View
                      </Button>
                      <select
                        className="text-xs border rounded px-1 py-1 cursor-pointer"
                        value={order.paymentStatus}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
