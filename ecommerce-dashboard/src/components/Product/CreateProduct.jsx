import API_BASE_URL from '../../config/api';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import axios from "axios";

export default function CreateProduct() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    discount: "",
    quantity: "",
    image: null,
    rating: "",
    category: "",
    subCategory: "",
  });

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(
        `${API_BASE_URL}/api/v1/category/getallcategories`
      );
      setCategories(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSubCategories = async () => {
    try {
      const { data } = await axios.get(
        `${API_BASE_URL}/api/v1/subcategory/getallsubcategories`
      );
      setSubCategories(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchSubCategories();
  }, []);

  console.log(categories);

  const handleChange = (field, value) => {
    // Fields that should be numbers
    const numericFields = ["price", "stock", "discount", "quantity", "rating"];

    setFormData((prev) => ({
      ...prev,
      [field]: numericFields.includes(field) ? Number(value) || 0 : value,
    }));
  };

  const handleFileChange = (file, e) => {
    console.log(e);

    setFormData((prev) => ({ ...prev, image: file.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Original formData:", formData);

      const dataToSend = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        dataToSend.append(key, value);
      });

      // Log FormData contents
      console.log("FormData being sent:");
      for (let [key, value] of dataToSend.entries()) {
        console.log(`${key}:`, value);
      }

      const res = await axios.post(
  `${API_BASE_URL}/api/v1/product/createproduct`,
  dataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Success:", res.data);
    } catch (error) {
      console.error("Error creating product:", error);
      console.error("Error response:", error.response?.data);
      console.error("Error status:", error.response?.status);
    }
  };

  return (
    <div className="min-h-screen  from-gray-50 to-gray-100 px-4 sm:px-6 md:px-12 lg:px-20 py-12">
      <form
        onSubmit={handleSubmit}
        className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-6 sm:p-8 md:p-10"
      >
        <FieldGroup>
          <FieldSet>
            <div className="mb-8">
              <FieldLegend className="text-2xl font-bold text-gray-800">
                Create Product Form
              </FieldLegend>
              <FieldDescription className="text-gray-600 mt-2">
                Fill in the details below to add a new product to your inventory
              </FieldDescription>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FieldGroup>
                <Field>
                  <FieldLabel
                    htmlFor="name"
                    className="text-gray-700 font-medium"
                  >
                    Product Name
                  </FieldLabel>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    placeholder="Product Name"
                    required
                    className="mt-1.5 h-11"
                  />
                </Field>
              </FieldGroup>

              <FieldGroup>
                <Field>
                  <FieldLabel
                    htmlFor="price"
                    className="text-gray-700 font-medium"
                  >
                    Product Price
                  </FieldLabel>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.price}
                    onChange={(e) => handleChange("price", e.target.value)}
                    placeholder="Product Price"
                    required
                    className="mt-1.5 h-11"
                  />
                </Field>
              </FieldGroup>

              <FieldGroup>
                <Field>
                  <FieldLabel
                    htmlFor="stock"
                    className="text-gray-700 font-medium"
                  >
                    Product Stock
                  </FieldLabel>
                  <Input
                    id="stock"
                    type="number"
                    min="0"
                    value={formData.stock}
                    onChange={(e) => handleChange("stock", e.target.value)}
                    placeholder="Product Stock"
                    required
                    className="mt-1.5 h-11"
                  />
                </Field>
              </FieldGroup>

              <FieldGroup>
                <Field>
                  <FieldLabel
                    htmlFor="quantity"
                    className="text-gray-700 font-medium"
                  >
                    Product Quantity
                  </FieldLabel>
                  <Input
                    id="quantity"
                    type="number"
                    min="0"
                    value={formData.quantity}
                    onChange={(e) => handleChange("quantity", e.target.value)}
                    placeholder="Product Quantity"
                    required
                    className="mt-1.5 h-11"
                  />
                </Field>
              </FieldGroup>

              <FieldGroup>
                <Field>
                  <FieldLabel
                    htmlFor="rating"
                    className="text-gray-700 font-medium"
                  >
                    Product Rating
                  </FieldLabel>
                  <Input
                    id="rating"
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    value={formData.rating}
                    onChange={(e) => handleChange("rating", e.target.value)}
                    placeholder="Product Rating"
                    required
                    className="mt-1.5 h-11"
                  />
                </Field>
              </FieldGroup>
              <FieldGroup>
                <Field>
                  <FieldLabel
                    htmlFor="product-discount"
                    className="text-gray-700 font-medium"
                  >
                    Product Discount
                  </FieldLabel>
                  <Input
                    id="discount"
                    type="number"
                    min="0"
                    max="100"
                    value={formData.discount}
                    onChange={(e) => handleChange("discount", e.target.value)}
                    placeholder="Product Discount"
                    required
                    className="mt-1.5 h-11"
                  />
                </Field>
              </FieldGroup>

              <FieldGroup>
                <Field>
                  <FieldLabel
                    htmlFor="image"
                    className="text-gray-700 font-medium"
                  >
                    Product Image
                  </FieldLabel>
                  <Input
                    onChange={(e) => handleFileChange(e.target, "image")}
                    id="image"
                    type="file"
                    className="mt-1.5 h-11"
                  />
                </Field>
              </FieldGroup>
            </div>
          </FieldSet>

          <FieldSet className="mt-8">
            <FieldGroup>
              <Field>
                <FieldLabel
                  htmlFor="description"
                  className="text-gray-700 font-medium"
                >
                  Description
                </FieldLabel>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  placeholder="Product Description"
                  className="resize-none mt-1.5"
                  rows={6}
                />
              </Field>
            </FieldGroup>
          </FieldSet>

          <FieldSet className="mt-8">
            <FieldGroup>
              <Field>
                <FieldLabel
                  htmlFor="category"
                  className="text-gray-700 font-medium"
                >
                  Select Category
                </FieldLabel>
                <Select
                  id="category"
                  value={formData.category}
                  onValueChange={(value) => handleChange("category", value)}
                >
                  <SelectTrigger className="w-full mt-1.5 h-11">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category._id} value={category._id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </FieldGroup>
          </FieldSet>

          <FieldSet className="mt-8">
            <FieldGroup>
              <Field>
                <FieldLabel
                  htmlFor="subCategory"
                  className="text-gray-700 font-medium"
                >
                  Select Sub Category
                </FieldLabel>
                <Select
                  id="subCategory"
                  value={formData.subCategory}
                  onValueChange={(value) => handleChange("subCategory", value)}
                >
                  <SelectTrigger className="w-full mt-1.5 h-11">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {subCategories.map((category) => (
                      <SelectItem key={category._id} value={category._id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </FieldGroup>
          </FieldSet>

          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-8 mt-8 border-t border-gray-200">
            <button
              type="submit"
              className="w-full sm:w-auto bg-blue-600 text-white font-semibold text-base py-2.5 px-8 rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
            >
              Create Product
            </button>
          </div>
        </FieldGroup>
      </form>
    </div>
  );
}
