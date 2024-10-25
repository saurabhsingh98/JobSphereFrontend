
import { useSelector } from "react-redux"
import LatestJobCard from "./LatestJobCard"

const LatestJobs = () => {

    const {allJobs}= useSelector(store=> store.job)
    const randomJobs=allJobs

  return (
    <div className="max-w-7xl mx-auto my-20">

        <h1 className="text-4xl font-bold"> <span className="text-[#54ccb4]"> Latest & Top</span> Job Openings</h1>
        
        <div className="grid grid-cols-3 gap-4 my-5">
        {
          randomJobs.length === 0 ? (
            <span>No Jobs Found</span>
            ) : (
          randomJobs.slice(0, 6).map((job, index) => (
              <LatestJobCard key={index} job={job} />
            ))
          )
        }
        </div>
       
        
    </div>
  )
}

export default LatestJobs