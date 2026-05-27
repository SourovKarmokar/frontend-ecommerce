import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import API_BASE_URL from "@/config/api";

const CreateCategory = () => {
   const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
      try {
        await axios.post(`${API_BASE_URL}/api/v1/category/createcategory`, data);
        toast.success("Category created successfully!");
        reset();
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to create category");
      }
    }

  return (
    <div className="px-10">
      This is CreateCategory Page      <form onSubmit={handleSubmit(onSubmit)} >
         <FieldGroup className='my-2' > 
              <Field>
                <FieldLabel htmlFor="name">
                  Category Name
               </FieldLabel>

                <Input
                 id="name"
                placeholder="Category Name"
                 {...register("name" ,  {
                  required : "Category Name is Required " })}
              />
              {
                errors.name && (
                  <p className="text-red-500">{errors.name.message}</p>
                )
              }
             </Field>
          </FieldGroup>
         <FieldGroup className='my-2'>
              <Field>
                <FieldLabel htmlFor="description">
                  Category Description
               </FieldLabel>

                <Input
                  {
                    ...register("description",{
                     required: "Category Description is Required"
                    })
                  }
                 id="description"
                placeholder="Category Description"
                
              />
              {
                errors.description && (
                  <p className="text-red-500">{errors.description.message}</p>
                )
              }
              
             </Field>
          </FieldGroup>
          <div className="mt-5">
            <Button>Create Category</Button>
          </div>
      </form>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </div>
  );
};

export default CreateCategory;
