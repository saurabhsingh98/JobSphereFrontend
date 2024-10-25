import {
  Table,
  TableCaption,
  TableHeader,
  TableHead,
  TableBody,
  TableCell,
} from "../ui/table";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { MoreHorizontal } from "lucide-react";

import { useSelector } from "react-redux";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";

const ApplicantsTable = () => {

  const shortlistingStatus = ['accepted', 'rejected'];

  const { applicants } = useSelector((store) => store.application);
  console.log(applicants);

  const statusHandler = async (update, id) => {

    try {
        console.log(update,' ', id);
        console.log('statusHandler Called: currently In try block')

      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        {status: update },
        {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
        }
       );

        console.log(res)
       
    
    } catch (error) {
        console.log(error)
    }

  };

  return (
    <div>
      <Table>
        <TableCaption>List Of Applicants</TableCaption>
        <TableHeader>
          <TableHead>FullName</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Contact</TableHead>
          <TableHead>Resume</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableHeader>
        <TableBody>
          {applicants &&
            applicants.map((item) => (
              <tr key={item.applicant._id}>
                <TableCell>{item.applicant.fullname}</TableCell>
                <TableCell>{item.applicant.email}</TableCell>
                <TableCell>{item.applicant.phoneNumber}</TableCell>
                <TableCell>
                  {item?.applicant?.profile?.resume ? (
                    <a
                      className="text-blue-500"
                      target="_blank"
                      href={`${item.applicant.profile.resume}`}
                    >
                      {item.applicant.profile.resumeOriginalName}
                    </a>
                  ) : (
                    <span>NA</span>
                  )}
                </TableCell>
                <TableCell>{Date(item?.applicant.createdAt)}</TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      {shortlistingStatus.map((status, index) => {
                        return (
                          <div key={index} onClick={()=> {statusHandler(status,item._id)}} >
                            <span  className="hover:cursor-pointer">{status}</span>
                          </div>
                        );
                      })}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </tr>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
