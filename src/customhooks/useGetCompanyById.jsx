import { setSingleCompany } from "@/redux/companySlice";
import { COMPANY_API_URL } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetCompanyById = ({ companyId }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchCompanyById = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_URL}/get/${companyId}`, {
                    withCredentials: true,
                });

                if (res.data.success) {
                    console.log(res)
                    dispatch(setSingleCompany(res.data.company));
                }

                console.log("Single Company fetch response", res);
            } catch (error) {
                console.log("Error while fetching company", error);
            }
        };

        if (companyId) {
            fetchCompanyById();
        }
    }, [dispatch, companyId]); // Ensure companyId is added to the dependency array
};

export default useGetCompanyById;
