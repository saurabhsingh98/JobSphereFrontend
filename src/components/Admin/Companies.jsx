import { Input } from "../ui/input"
import { Button } from "../ui/button"

import Navbar from "../shared/Navbar"
import MyCompaniesTable from "./MyCompaniesTable"
import { useNavigate } from "react-router-dom"
import useGetAllCompanies from "@/customhooks/useGetAllCompanies"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { setSearchCompanyByText } from "@/redux/companySlice"


const Companies = () => {

    const navigate= useNavigate();

    // get all companies stored in redux
    useGetAllCompanies();

    // variable for search bar
    const [input, setInput]= useState("");
    //real time me redux me update krenge seachi bar m kya hai
    const dispatch=useDispatch();

    useEffect(()=>{
        dispatch(setSearchCompanyByText(input));
    },[input])

  return (
    <div>
        <Navbar/>
        <div className="max-w-6xl mx-auto my-10">

            <div className="flex items-center justify-between my-5">
                <Input 
                onChange={(e)=> setInput(e.target.value) }
                className='w-fit' 
                placeholder="filter by name" />
                <Button onClick={()=> navigate('/admin/companies/create')} className='bg-teal-500 hover:bg-teal-600'>New Company +</Button>
            </div>
           <MyCompaniesTable />
        </div>
       
    </div>
  )
}

export default Companies