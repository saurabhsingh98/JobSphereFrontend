import {
    Table,
    TableCaption,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MyCompaniesTable = () => {

    const navigate= useNavigate();

    const { companies ,searchCompanyByText} = useSelector((store) => store.company);

    const [filterCompanies, setFilterCompanies]= useState(companies);

    useEffect(()=>{
        const filterCompany= companies.length>0 && companies.filter((company)=> {
            if(!searchCompanyByText){
                return true;
            };

            return company?.companyName?.toLowerCase().includes(searchCompanyByText.toLowerCase());

        })

        setFilterCompanies(filterCompany);

    },[companies, searchCompanyByText])


    return (
        <div>
            <Table>
                <TableCaption>My Companies</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filterCompanies.length <= 0 ? (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center">
                                No Company Registered Yet
                            </TableCell>
                        </TableRow>
                    ) : (
                        filterCompanies.map((company, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <Avatar>
                                        <AvatarImage src={company.logo || "https://diginsights.com/wp-content/uploads/2024/03/starbsloh.png.jpeg"} />
                                    </Avatar>
                                </TableCell>
                                <TableCell>{company.companyName}</TableCell>
                                <TableCell>{new Date(company.createdAt).toLocaleDateString()}</TableCell>
                                <TableCell className="text-right">
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-32">

                                            <div onClick={()=> navigate(`/admin/companies/${company._id}`)} className="flex items-center gap-2 w-fit cursor-pointer">
                                                <Edit2 className="w-4" />
                                                <span>Edit</span>
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

export default MyCompaniesTable;
