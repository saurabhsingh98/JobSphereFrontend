import JobCard from "./JobCard";
import Navbar from "./shared/Navbar"


const Browse = () => {

  const randomJobs= [1,2,3,3,4,5,6,7];

  return (
    <div>
        <Navbar/>

        <div className="max-w-7xl  my-10 mx-auto">
            <h1>Search Results  {randomJobs.length} </h1>
            <div className=" grid grid-cols-3 gap-4">
              {
                randomJobs.map((item,index)=> {  return <JobCard key={index}/> })
              }
            </div>
        </div>
        

    </div>
  )
}

export default Browse