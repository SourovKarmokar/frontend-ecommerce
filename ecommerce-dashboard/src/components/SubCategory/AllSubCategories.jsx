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



export default function AllSubCategories() {

  const [subCategories, setSubCategories] = useState([])

  const  fetchSubCategories =  async () =>{
    try{
      const {data} = await axios.get(`${API_BASE_URL}/api/v1/subcategory/getallsubcategories`);
      setSubCategories(data.data);
      
    }catch(error) {
      console.log(error);
      
    }
  }

  useEffect(()=>{
    fetchSubCategories()
  },[])
  
  const handleDelete = async (id) =>{
    try{
        console.log(id);
    await axios.delete(`http://localhost:5000/api/v1/subcategory/deletesubcategory/${id}`);
    }catch(error){
        console.log(error);
        
    }
    
    fetchSubCategories();
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
        {subCategories.map((subcategory,index) => (
          <TableRow key={subcategory._id}>
            <TableCell className="font-medium">{index+1}</TableCell>
            <TableCell>{subcategory.name}</TableCell>
            <TableCell>{subcategory.description}</TableCell>
            <TableCell>
              <Link to={`/update-subcategory/${subcategory._id}`}>
              <Button className="mr-3 ">Edit</Button>
              </Link>
            <Button 
            onClick={()=>handleDelete(subcategory._id)}
            className="bg-red-500" >Delete</Button>
            </TableCell>
           
          </TableRow>
        ))}
      </TableBody>
      
    </Table>
    </div>
  )
}



