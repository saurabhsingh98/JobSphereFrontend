import { useEffect } from "react"
import Navbar from "../shared/Navbar"
import ApplicantsTable from "./ApplicantsTable"
import axios from "axios"
import { APPLICATION_API_END_POINT } from "@/utils/constant"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { setApplicants } from "@/redux/applicationSlice"

const Applicants = () => {

  const params= useParams();
  const dispatch= useDispatch();

  const {applicants}= useSelector(store=> store.application)


  useEffect(()=>{
    const fetchAllApplicants= async()=>{
        try {  
          const res= await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants` ,{
            withCredentials:true
          })
          if(res.data.success){
            dispatch(setApplicants(res.data.job.applications))
          }
      } catch (error) {
        console.log('error while fetching applicants in applicants.jsx in admin section', error)
      }
    }
    fetchAllApplicants();

  },[])

  return (
    <div>
        <Navbar/>
        <div className="max-w-6xl mx-auto">
          <h1 className="font-bold text-xl my-5">Applicants( {applicants?.length} )</h1>
          <ApplicantsTable/>
        </div>
    </div>
  )
}

export default Applicants