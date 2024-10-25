
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Badge } from "./ui/badge"
import { useSelector } from "react-redux"


const AppliedJobTable = () => {

    const {appliedJobs}=useSelector(store=> store.application)
    console.log(appliedJobs)
  return (
    <div>
        <Table>
            <TableCaption>List of Applied Jobs</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Job Role</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead className='text-right'>Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    appliedJobs && appliedJobs.map((item)=> (
                        <TableRow key={item._id}>
                            <TableCell>{new Date(item?.createdAt).toLocaleDateString()}</TableCell>

                            <TableCell>{item?.job?.title}</TableCell>
                            <TableCell>{item?.job?.company?.companyName}</TableCell>
                            <TableCell className='text-right' > <Badge variant='outline'>{item.status}</Badge></TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    </div>

  )
}

export default AppliedJobTable