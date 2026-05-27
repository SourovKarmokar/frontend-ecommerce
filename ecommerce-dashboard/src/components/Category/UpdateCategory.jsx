import API_BASE_URL from '../../config/api';
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";

const UpdateCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState({ name: "", description: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const fetchCategory = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/category/getsinglecategory/${id}`
      );
      setCategory(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.patch(
        `http://localhost:5000/api/v1/category/updatecategory/${id}`,
        category
      );
      setMessage("Category updated successfully!");
      setTimeout(() => navigate("/all-categories"), 1500);
    } catch (error) {
      setMessage("Failed to update category.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-10 py-6">
      <h2 className="text-xl font-bold mb-6">Update Category</h2>
      {message && (
        <div className={`mb-4 p-3 rounded text-sm ${message.includes("success") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
          {message}
        </div>
      )}
      <form onSubmit={handleUpdate}>
        <FieldGroup className="my-2">
          <Field>
            <FieldLabel htmlFor="name">Category Name</FieldLabel>
            <Input
              onChange={(e) => setCategory({ ...category, name: e.target.value })}
              id="name"
              placeholder="Category Name"
              value={category?.name || ""}
            />
          </Field>
        </FieldGroup>
        <FieldGroup className="my-2">
          <Field>
            <FieldLabel htmlFor="description">Category Description</FieldLabel>
            <Input
              onChange={(e) => setCategory({ ...category, description: e.target.value })}
              id="description"
              placeholder="Category Description"
              value={category?.description || ""}
            />
          </Field>
        </FieldGroup>
        <div className="mt-5">
          <Button type="submit" disabled={loading}>
            {loading ? "Updating..." : "Update Category"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UpdateCategory;
