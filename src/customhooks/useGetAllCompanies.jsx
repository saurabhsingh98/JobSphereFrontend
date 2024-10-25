
import { setCompanies } from "@/redux/companySlice";
import { COMPANY_API_URL } from "@/utils/constant";
import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"


const useGetAllCompanies = () => {

    const dispatch= useDispatch();

        useEffect(()=>{

            const fetchAllCompanies= async ()=>{

                try {
                    const res= await axios.get(`${COMPANY_API_URL}/get` , {withCredentials: true})
                    console.log(res)

                    if(res.data.success){
                        dispatch(setCompanies(res.data.companies))
                    }
                    console.log(res);
                    
                } catch (error) {
                    console.log('error while fetching job',error)
                }

            }

            fetchAllCompanies();

        },[])
  
}

export default useGetAllCompanies