import FilterCard from "./FilterCard"
import Navbar from "./shared/Navbar"
import JobCard from "./JobCard";
import { useSelector } from "react-redux";

const Jobs = () => {


  const {allJobs}= useSelector(store=> store.job)
  const jobsarray=allJobs;


  return (
    <div className="max-w-7xl m-auto">

        <Navbar/>

         <div className="flex gap-5">

            <div className="w-[20%]"> <FilterCard/> </div>

            <div className="flex-1 h-[88vh] overscroll-y-auto pb-5">

               <div className="grid grid-cols-3 gap-10">

                {
                    jobsarray.length<=0 ? ( <div>Jobs Not Found </div> ):

                    (
                      jobsarray.map((job)=> (  <div key={job?._id}> <JobCard job={job}/> </div> ))
                    )
                }

              </div>

            </div>

         </div>

    </div>
  )
}

export default Jobs