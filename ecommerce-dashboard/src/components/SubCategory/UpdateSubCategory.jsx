import API_BASE_URL from '../../config/api';
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useEffect, useState } from "react";
import { useParams } from "react-router";

const UpdateSubCategory = () => {
  const { id } = useParams();

  const [subCategory, setSubCategory] = useState(null);
  const [categories, setCategories] = useState([]);

  const {
    control,
    formState: { errors },
  } = useForm();

  const fetchSubCategories = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/subcategory/getsinglesubcategory/${id}`
      );
      setSubCategory(data.data);
      console.log("SubCategory loaded:", data.data);
    } catch (error) {
      console.error("Error fetching subcategory:", error);
      toast.error("Failed to load subcategory");
    }
  };

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(
        `${API_BASE_URL}/api/v1/category/getallcategories`
      );
      setCategories(data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to load categories");
    }
  };

  useEffect(() => {
    if (id) {
      fetchSubCategories();
      fetchCategories();
    }
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      // Send the updated subcategory data
      const res = await axios.patch(
        `http://localhost:5000/api/v1/subcategory/updatesubcategory/${id}`,
        {
          name: subCategory.name,
          description: subCategory.description,
          category: subCategory.category,
        }
      );

      console.log("Update response:", res);
      toast.success("Subcategory updated successfully!");
    } catch (error) {
      console.error("Error updating subcategory:", error);
      toast.error("Failed to update subcategory");
    }
  };

  return (
    <div className="px-10">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      
      <form onSubmit={handleUpdate}>
        <FieldGroup className="my-2">
          <Field>
            <FieldLabel htmlFor="name">Subcategory Name</FieldLabel>
            <Input
              onChange={(e) =>
                setSubCategory({ ...subCategory, name: e.target.value })
              }
              id="name"
              placeholder="Subcategory Name"
              value={subCategory?.name || ""}
            />
          </Field>
        </FieldGroup>

        <FieldGroup className="my-2">
          <Field>
            <FieldLabel htmlFor="description">
              Subcategory Description
            </FieldLabel>
            <Input
              onChange={(e) =>
                setSubCategory({ ...subCategory, description: e.target.value })
              }
              id="description"
              placeholder="Subcategory Description"
              value={subCategory?.description || ""}
            />
          </Field>
        </FieldGroup>

        <FieldGroup className="my-2">
          <Field>
            <FieldLabel htmlFor="categoryId">Category</FieldLabel>
            <Controller
              name="categoryId"
              control={control}
              defaultValue={subCategory?.category?._id || ""}
              render={({ field }) => (
                <Select
                  value={
                    subCategory?.category?._id || subCategory?.category || ""
                  }
                  onValueChange={(value) =>
                    setSubCategory({
                      ...subCategory,
                      category: value,
                    })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Categories</SelectLabel>
                      {categories.map((category) => (
                        <SelectItem key={category._id} value={category._id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.categoryId && (
              <p className="text-red-500 text-sm mt-1">
                {errors.categoryId.message}
              </p>
            )}
          </Field>
        </FieldGroup>

        <div className="mt-5">
          <Button type="submit">Update Subcategory</Button>
        </div>
      </form>
    </div>
  );
};

export default UpdateSubCategory;
