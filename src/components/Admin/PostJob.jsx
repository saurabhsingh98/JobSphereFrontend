import { useState } from "react";
import Navbar from "../shared/Navbar";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";

const PostJob = () => {
  const navigate = useNavigate();

  const [loading, setLoading]= useState(false);

  const {companies}= useSelector(store=> store.company)
  console.log(companies)

  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experienceLevel: "",
    position: "",
    company: "",
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectCompanyChangeHandler=(value)=>{
    const selectedCompany= companies.find((company)=> company.companyName.toLowerCase()===value)
    setInput({...input, company: selectedCompany._id})
  }

  const onSubmitHandler= async(e)=>{
    e.preventDefault();
    try {
        setLoading(true);
        const res= await axios.post(`${JOB_API_END_POINT}/post`, input, {
          headers:{
            'Content-Type':'application/json'
          },
          withCredentials:true
        });
        
        if(res.data.success){
          console.log(res.data.message);
          navigate('/admin/jobs')
        }

    } catch (error) {
      console.log('error while posting job in PostJob.jsx page', error)
    }
    finally{
      setLoading(false);
    }

  }

  return (
    <div>
      <Navbar />
      <div className="max-w-xl mx-auto my-10">
        <form onSubmit={(e)=>{ onSubmitHandler(e) }}>
          <div className="flex items-center gap-24 p-5">
            <Button
              onClick={() => navigate("/admin/jobs")}
              variant="outline"
              className="flex items-center gap-2 text-gray-500 font-semibold"
            >
              <span>Back</span>
            </Button>
            <h1 className="font-bold text-xl text-gray-600">Post New Job</h1>
          </div>

          {/* Company Name */}
          <div>
            <Label>Title:</Label>
            <Input
              className="my-2"
              type="text"
              name="title" // Ensure name is companyName
              value={input.title} // Update to reflect the input state
              onChange={changeEventHandler}
            />
          </div>
          {/* Description */}
          <div>
            <Label>Description:</Label>
            <Input
              className="my-2"
              type="text"
              name="description"
              value={input.description}
              onChange={changeEventHandler}
            />
          </div>

          {/* Requirement and Salary */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label>Requirements:</Label>
              <Input
                className="my-2"
                type="text"
                name="requirements"
                value={input.requirements}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Salary:</Label>
              <Input
                className="my-2"
                type="number"
                name="salary" // Ensure name is companyName
                value={input.salary} // Update to reflect the input state
                onChange={changeEventHandler}
              />
            </div>
          </div>
          {/* Location and Job Type */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label>Location:</Label>
              <Input
                className="my-2"
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Job Type:</Label>
              <Input
                className="my-2"
                type="text"
                name="jobType" // Ensure name is companyName
                value={input.jobType} // Update to reflect the input state
                onChange={changeEventHandler}
              />
            </div>
          </div>
          {/* Select Company*/}
          <div className="my-2">
            <Select onValueChange={selectCompanyChangeHandler} >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Company" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>

                  {
                    companies.map((company)=> (
                      <SelectItem value={company?.companyName?.toLowerCase() } key={company._id}>{company.companyName}</SelectItem>
                    ))
                  }
                  
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Experience level and Number of Positions */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label>Experience:</Label>
              <Input
                className="my-2"
                type="number"
                name="experienceLevel"
                value={input.experienceLevel}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>No of Positions:</Label>
              <Input
                className="my-2"
                type="number"
                name="position" // Ensure name is companyName
                value={input.position} // Update to reflect the input state
                onChange={changeEventHandler}
              />
            </div>
          </div>

          <div>
                        <Button type="submit" className="w-full mt-8 bg-teal-500 hover:bg-teal-600">
                            {loading ? "Loading..." : "Post Job"}
                        </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostJob;
