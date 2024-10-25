import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useState, useEffect } from "react";
import axios from "axios";
import { COMPANY_API_URL } from "@/utils/constant";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import useGetCompanyById from "@/customhooks/useGetCompanyById";

const EditCompany = () => {
    const navigate = useNavigate();
    const { singleCompany } = useSelector((store) => store.company);
    const [input, setInput] = useState({
        companyName: "",
        description: "",
        website: "",
        location: "",
        file: null,
    });
    const [loading, setLoading] = useState(false);
    const params = useParams();

    // Fetch the company by ID
    useGetCompanyById({ companyId: params.id });

    // Update form fields when singleCompany changes
    useEffect(() => {
        if (singleCompany) {
            setInput({
                companyName: singleCompany.companyName || "",
                description: singleCompany.description || "",
                website: singleCompany.website || "",
                location: singleCompany.location || "",
                file: null,
            });
        }
    }, [singleCompany]);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setInput({ ...input, file });
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("companyName", input.companyName); // Fix the name here
        formData.append("description", input.description);
        formData.append("website", input.website);
        formData.append("location", input.location);

        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            setLoading(true);
            const res = await axios.post(`${COMPANY_API_URL}/update/${params.id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
            });

            if (res?.data?.success) {
                console.log(res?.data?.message);
                navigate("/admin/companies");
            }
        } catch (error) {
            console.log("Error while editing company details", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="max-w-xl mx-auto my-10">
                <form onSubmit={submitHandler}>
                    <div className="flex items-center gap-24 p-5">
                        <Button onClick={() => navigate("/admin/companies")} variant="outline" className="flex items-center gap-2 text-gray-500 font-semibold">
                            <span>Back</span>
                        </Button>
                        <h1 className="font-bold text-xl text-gray-600">Company Setup</h1>
                    </div>

                    {/* Company Name */}
                    <div>
                        <Label>Company Name:</Label>
                        <Input
                            className="my-2"
                            type="text"
                            name="companyName" // Ensure name is companyName
                            value={input.companyName} // Update to reflect the input state
                            onChange={changeEventHandler}
                        />
                    </div>
                    {/* Description */}
                    <div>
                        <Label>Description:</Label>
                        <Input
                            type="text"
                            name="description"
                            value={input.description}
                            onChange={changeEventHandler}
                            className="my-2"
                        />
                    </div>
                    {/* Website */}
                    <div>
                        <Label>Website:</Label>
                        <Input
                            type="text"
                            name="website"
                            value={input.website}
                            onChange={changeEventHandler}
                            className="my-2"
                        />
                    </div>
                    {/* Location */}
                    <div>
                        <Label>Location:</Label>
                        <Input
                            type="text"
                            name="location"
                            value={input.location}
                            onChange={changeEventHandler}
                            className="my-2"
                        />
                    </div>
                    {/* Logo */}
                    <div>
                        <Label>Logo:</Label>
                        <Input
                            type="file"
                            accept="image/*"
                            onChange={changeFileHandler}
                            className="my-2"
                        />
                    </div>

                    <div>
                        <Button type="submit" className="w-full mt-8 bg-teal-500 hover:bg-teal-700">
                            {loading ? "Loading..." : "Submit"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditCompany;
