import { Button } from "./ui/button";
import { Avatar } from "./ui/avatar";
import { AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const JobCard = ( {job} ) => {
  const navigate = useNavigate();

  const mongoDbTime = job?.createdAt;
  const daysAgoFunction = (mongoDbTime) => {
    const createdAt = new Date(mongoDbTime);
    const currentTime = new Date();

    const timeDiff = currentTime - createdAt;

    return Math.floor(timeDiff / (1000 * 24 * 60 * 60));
  };

  const time = daysAgoFunction(mongoDbTime);

  return (
    <div className="p-5 rounded-md shadow-lg bg-white border border-gray-300">
      <p className="m-2 text-sm text-gray-500">
        {time === 0 ? "Today" : `${time} Days Ago`}{" "}
      </p>

      <div className=" flex gap-2">
        <Button variant="outline" className="rounded-full">
          <Avatar>
            <AvatarImage src={job?.company?.logo} />
          </Avatar>
        </Button>

        <div>
          <h1 className="font-medium text-lg">{job?.company?.companyName}</h1>
          <p className="text-sm text-gray-500 ">{job?.location}</p>
        </div>
      </div>

      <div>
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-500">{job?.description}</p>
      </div>

      <div className="flex items-center gap-2 mt-4">
        <Badge className="text-red-300 font-bold m-1" variant="outline">
          {job?.position} Position
        </Badge>
        <Badge className="text-red-300 font-bold m-1" variant="outline">
          {job?.jobType}
        </Badge>
        <Badge className="text-red-300 font-bold m-1" variant="outline">
          {job?.salary}
        </Badge>
      </div>

      <div className="flex gap-1 my-1">
        <Button
          onClick={() => {
            navigate(`/description/${job?._id}`);
          }}
          variant="outline"
          className="h-8"
        >
          Details
        </Button>
        <Button variant="outline" className="h-8">
          SaveForLater
        </Button>
      </div>
    </div>
  );
};

export default JobCard;
