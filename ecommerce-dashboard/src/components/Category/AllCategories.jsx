import API_BASE_URL from '../../config/api';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


import { Button } from "@/components/ui/button"
import { useEffect } from "react"
import axios from "axios"
import { useState } from "react"
import { Link } from "react-router"



export default function AllCategories() {
  const [categories, setCategories] = useState([])

  const  fetchCategories =  async () =>{
    try{
      const {data} = await axios.get(`${API_BASE_URL}/api/v1/category/getallcategories`);
      setCategories(data.data);
      
    }catch(error) {
      console.log(error);
      
    }
  }

  useEffect(()=>{
    fetchCategories()
  },[])
  
  const handleDelete = async (id) => {
  try {
    await axios.delete(`http://localhost:5000/api/v1/category/deletecategory/${id}`);
    fetchCategories();
  } catch (error) {
    console.log(error);
  }
}
  
  return (
    <div className="mx-10 shadow rounded py-2">
      <Table>
      
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Sr.</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead >Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories.map((category,index) => (
          <TableRow key={category._id}>
            <TableCell className="font-medium">{index+1}</TableCell>
            <TableCell>{category.name}</TableCell>
            <TableCell>{category.description}</TableCell>
            <TableCell>
              <Link to={`/update-category/${category._id}`}>
              <Button className="mr-3 ">Edit</Button>
              </Link>
            <Button 
            onClick={()=>handleDelete(category._id)}
            className="bg-red-500" >Delete</Button>
            </TableCell>
           
          </TableRow>
        ))}
      </TableBody>
      
    </Table>
    </div>
  )
}



