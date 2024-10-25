import {
    Table,
    TableCaption,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "../ui/table";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MyJobsTable = () => {

    const navigate= useNavigate();

    const {allAdminJobs, searchJobText}= useSelector(store=> store.job);
    
    const [filterJobs, setFilterJobs]= useState(allAdminJobs);


    console.log(allAdminJobs);

    useEffect(()=>{
            const filterJob= allAdminJobs.length>=0 && allAdminJobs.filter( (job)=>{
                if(!searchJobText){
                    return true;
                };
                // filter by company name or role
                return job?.company?.companyName?.toLowerCase().includes(searchJobText.toLowerCase()) || job?.title?.toLowerCase().includes(searchJobText.toLowerCase());

            })

            setFilterJobs(filterJob);
    },[allAdminJobs, searchJobText])

    return (
        <div>
            <Table>
                <TableCaption>My Posted Jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Company Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filterJobs.length <= 0 ? (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center">
                                No Company Registered Yet
                            </TableCell>
                        </TableRow>
                    ) : (
                        filterJobs.map((job, index) => (
                            <TableRow key={index}>
                                
                                <TableCell>{job.company.companyName}</TableCell>
                                <TableCell>{job.title}</TableCell>
                                <TableCell>{new Date(job.createdAt).toLocaleDateString()}</TableCell>

                                <TableCell className="text-right">
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-32">

                                            {/* <div onClick={()=> navigate(`/admin/companies/${job._id}`)} className="flex items-center gap-2 w-fit cursor-pointer">
                                                <Edit2 className="w-4" />
                                                <span>Edit</span>
                                            </div> */}
                                            <div onClick={()=> navigate(`/admin/jobs/${job._id}/applicants`)} className="flex items-center gap-2 w-fit cursor-pointer">
                                                <Eye className="w-3" />
                                                <span className="text-sm">Applicants</span>
                                            </div>

                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default MyJobsTable;
