
import Navbar from "../shared/Navbar"

import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import MyJobsTable from "./MyJobsTable"
import useGetAllJobsByAdmin from "@/customhooks/useGetAllJobsByAdmin"
import { setSearchJobText } from "@/redux/jobSlice"
import { useDispatch } from "react-redux"

const JobsAdmin = () => {

    const dispatch= useDispatch();
    useGetAllJobsByAdmin();

    const [input, setInput]= useState("");

    const navigate= useNavigate();

    useEffect(()=>{
      dispatch(setSearchJobText(input));
  },[input])

  return (
    <div>
        <Navbar/>
        <div className="max-w-6xl mx-auto my-10">

            <div className="flex items-center justify-between my-5">
                <Input 
                onChange={(e)=> setInput(e.target.value) }
                className='w-fit' 
                placeholder="filter by name or role" />
                <Button onClick={()=> navigate('/admin/jobs/post')} className='bg-teal-500 hover:bg-teal-600'>New Job +</Button>
            </div>

            <MyJobsTable/>

        </div>
       
    </div>
  )
}

export default JobsAdmin