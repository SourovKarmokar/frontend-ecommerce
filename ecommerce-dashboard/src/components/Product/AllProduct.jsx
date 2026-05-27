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
import { Input } from "@/components/ui/input";

export default function AllProduct() {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [editProduct, setEditProduct] = useState(null);
  const pageSize = 10;

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/product/getallproduct?page=${currentPage}&size=${pageSize}`
      );
      setProducts(data.data);
      setTotal(data.total);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/v1/product/deleteproduct/${id}`);
      setMessage("Product deleted successfully!");
      fetchProducts();
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("Failed to delete product.");
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(
        `http://localhost:5000/api/v1/product/updateproduct/${editProduct._id}`,
        {
          name: editProduct.name,
          price: editProduct.price,
          stock: editProduct.stock,
          discount: editProduct.discount,
        }
      );
      setMessage("Product updated successfully!");
      setEditProduct(null);
      fetchProducts();
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("Failed to update product.");
    }
  };

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="mx-4 md:mx-10 py-4">
      <h2 className="text-xl font-bold mb-4">All Products ({total})</h2>

      {message && (
        <div className={`mb-4 p-3 rounded text-sm ${message.includes("success") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
          {message}
        </div>
      )}

      {/* Edit Modal */}
      {editProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">Edit Product</h3>
            <form onSubmit={handleEditSubmit} className="space-y-3">
              <div>
                <label className="text-sm font-medium">Name</label>
                <Input
                  value={editProduct.name}
                  onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Price</label>
                <Input
                  type="number"
                  value={editProduct.price}
                  onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Stock</label>
                <Input
                  type="number"
                  value={editProduct.stock}
                  onChange={(e) => setEditProduct({ ...editProduct, stock: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Discount (%)</label>
                <Input
                  type="number"
                  value={editProduct.discount}
                  onChange={(e) => setEditProduct({ ...editProduct, discount: e.target.value })}
                />
              </div>
              <div className="flex gap-3 pt-2">
                <Button type="submit" className="flex-1">Save Changes</Button>
                <Button type="button" variant="outline" className="flex-1" onClick={() => setEditProduct(null)}>Cancel</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-center py-10 text-gray-500">Loading products...</div>
      ) : (
        <>
          <div className="shadow rounded overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Sr.</TableHead>
                  <TableHead>Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Discount</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product, index) => (
                  <TableRow key={product._id}>
                    <TableCell>{(currentPage - 1) * pageSize + index + 1}</TableCell>
                    <TableCell>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                    </TableCell>
                    <TableCell className="font-medium max-w-[150px] truncate">{product.name}</TableCell>
                    <TableCell>${product.price}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>{product.discount}%</TableCell>
                    <TableCell>{product.rating}/5</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => setEditProduct(product)}
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          className="bg-red-500 hover:bg-red-600"
                          onClick={() => handleDelete(product._id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center gap-2 mt-4 justify-center flex-wrap">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Prev
              </Button>
              {[...Array(totalPages).keys()].map((i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 rounded text-sm font-medium ${
                    currentPage === i + 1
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
