import Navbar from "../shared/Navbar"

import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { COMPANY_API_URL } from "@/utils/constant"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { setSingleCompany } from "@/redux/companySlice"


const CreateCompany = () => {
    const navigate= useNavigate();

    const [companyName, setCompanyName]= useState("");

    const dispatch= useDispatch();

    const registerNewCompany= async()=>{
        try {
            const response= await axios.post(`${COMPANY_API_URL}/register`,{companyName}, {
                headers:{
                    'Content-Type': 'application/json'
                },
                withCredentials:true
            });

            if(response?.data?.success){
                
                console.log(response);

                dispatch(setSingleCompany(response.data.company))
                console.log(response.data.message)

                const companyId=response.data.company._id;

                navigate(`/admin/companies/${companyId}`)
            }

        } catch (error) {
            console.log('error while registering company in CreateCOmpany.jsx', error)
        }
    }
  return (
    <div>
        <Navbar />
        <div className="max-w-4xl mx-auto">
            <div className="my-10">
                <h1 className="font-bold text-2xl">Your Company Name</h1>
                <p className="text-gray-400">Give Company Name.. You Can change it later</p>
            </div>
            
            <Label>Company Name</Label>
            <Input
            type="text"
            className="my-2"
            placeholder="Google, Microsoft , Cognizant ..."
            onChange={(e)=> setCompanyName(e.target.value)}
            />

            <div className="flex items-center gap-2 my-10">
                <Button onClick={()=> navigate('/admin/companies')} variant='outline' > Cancle </Button>
                <Button onClick={()=> registerNewCompany()} className='bg-cyan-700'>Continue</Button>
            </div>
        </div>
    </div>
  )
}

export default CreateCompany