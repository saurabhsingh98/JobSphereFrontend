import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setSingleJob } from "@/redux/jobSlice";

const JobDescription = () => {
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);

    const dispatch = useDispatch();
    const params = useParams();
    const jobId = params.id;

    const [isApplied, setIsApplied] = useState(false);

    // Function to check if user has already applied
    const alreadyApplied = () => {
        return singleJob?.applications?.some(applier => applier.applicant === user?._id);
    };

    // Fetch job by ID and set job data
    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });

                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                }
            } catch (error) {
                console.log('error while fetching job with id', error);
            }
        };
        fetchSingleJob();
    }, [jobId, dispatch]);

    // Set `isApplied` once the job data and user are loaded
    useEffect(() => {
        if (singleJob && user) {
            setIsApplied(alreadyApplied());
        }
    }, [singleJob, user]);

    // Handle job application
    const applyJobHandler = async () => {
        try {
            const res = await axios(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });
            if (res.data.success) {
                setIsApplied(true);

                const updatedSingleJob = {
                    ...singleJob,
                    applications: [...singleJob.applications, { applicant: user?._id }]
                };

                dispatch(setSingleJob(updatedSingleJob));
                console.log('Applied for job successfully');
            }
        } catch (error) {
            console.log('error while applying for job', error);
        }
    };

    return (
        <div className="max-w-7xl mx-auto my-10">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-bold text-xl">{singleJob?.company?.companyName}</h1>
                    <div className="flex items-center gap-2 mt-4">
                        <Badge className="text-red-300 font-bold m-1" variant="outline">{singleJob?.position} Position</Badge>
                        <Badge className="text-red-300 font-bold m-1" variant="outline">{singleJob?.jobType}</Badge>
                        <Badge className="text-red-300 font-bold m-1" variant="outline">{singleJob?.salary} lpa</Badge>
                    </div>
                </div>
                <Button 
                    onClick={isApplied ? null : applyJobHandler}
                    disabled={isApplied} 
                    className={`rounded-lg ${isApplied ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
                >
                    {isApplied ? 'Already Applied' : 'Apply'}
                </Button>
            </div>
            <h1 className="border-b-2 border-b-gray-300 font-medium py-4">{singleJob?.description}</h1>
            <div>
                <h3 className="font-bold my-1">Role: <span className="pl-4 font-normal text-gray-800">{singleJob?.title}</span></h3>
                <h3 className="font-bold my-1">Location: <span className="pl-4 font-normal text-gray-800">{singleJob?.location}</span></h3>
                <h3 className="font-bold my-1">Description: <span className="pl-4 font-normal text-gray-800">{singleJob?.description}</span></h3>
                <h3 className="font-bold my-1">Experience: <span className="pl-4 font-normal text-gray-800">{singleJob?.experienceLevel} years</span></h3>
                <h3 className="font-bold my-1">Salary: <span className="pl-4 font-normal text-gray-800">{singleJob?.salary} lpa</span></h3>
                <h3 className="font-bold my-1">Total Applicants: <span className="pl-4 font-normal text-gray-800">{singleJob?.applications?.length}</span></h3>
                <h3 className="font-bold my-1">Posted Date: <span className="pl-4 font-normal text-gray-800">{singleJob?.createdAt.split("T")[0]}</span></h3>
            </div>
        </div>
    );
};

export default JobDescription;
