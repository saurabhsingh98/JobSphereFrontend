import { Badge } from "./ui/badge"

const LatestJobCard = ({job}) => {
  return (
    <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer'>
        <div>
            <h1 className="font-medium text-lg">{job?.company?.companyName}</h1>
            <p className="text-sm text-gray-500">{job?.location}</p>
        </div>
        
        <div>
            <h1 className="font-bold my-3">{job?.title}</h1>
            <p>{job?.description} </p>
        </div>

        <div className="flex items-center gap-2 mt-4">
            <Badge className="text-red-300 font-bold m-1" variant="outline">{job?.position}positions</Badge>
            <Badge className="text-red-300 font-bold m-1" variant="outline">{job?.jobType}</Badge>
            <Badge className="text-red-300 font-bold m-1" variant="outline">{job?.salary}LPA</Badge>
        </div>

    </div>
  )
}

export default LatestJobCard