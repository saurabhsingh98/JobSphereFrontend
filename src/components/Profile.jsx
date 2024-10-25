import { useState } from "react"
import Navbar from "./shared/Navbar"
import AppliedJobTable from "./AppliedJobTable"
import UpdateProfileDialog from "./UpdateProfileDialog"
import { useSelector } from "react-redux"

import { Avatar, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Pen , Mail, Contact} from "lucide-react"
import { Label } from "./ui/label"
import useGetAllAppliedJobs from "@/customhooks/useGetAllAppliedJobs"



const profile = () => {

    //set all applied jobs
    useGetAllAppliedJobs();

    const isResume=true;
    const [open, setOpen]= useState(false);
    const {user}= useSelector(store=>store.auth);

    const skills= user?.profile?.skills

  return (
    <div>
        <Navbar/>

        <div className=" max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">

            <div className="flex justify-between">
              <div className="flex items-center gap-4">
                {/* avatar */}
                  <Avatar>
                      <AvatarImage src={user?.profile?.profilePhoto} alt="profile pic"/>
                  </Avatar>
                  {/* name and bio */}
                  <div>
                      <h1 className="font-medium text-xl">{(user)?user.fullname:'fullname'}</h1>
                      <p>{user?.profile?.bio}</p>
                  </div>
              </div>

              <Button onClick={()=>{ setOpen(true)}} className='text-right' variant='outline'> <Pen /> </Button>
            </div>

            {/* email and number box */}
            <div className="my-5">

              <div className="flex items-center gap-3 my-2">
              <Mail className="w-5"/>
              <span>{(user)?user.email:'fullname'}</span>
              </div>
              
              <div className="flex items-center gap-3 my-2">
              <Contact className="w-5"/>
              <span>{user?.phoneNumber}</span>
              </div>
           
            </div>

            {/*skill*/}
            <div>
                <h1>Skills</h1>
                {
                    (skills.length !== 0) ? (
                        skills.map((item, index) => ( 
                            <Badge key={index} className='m-1' variant='outline'>{item}</Badge>
                        ))
                    ) : (
                        <div>NA</div>
                    )
                }
            </div>

            {/* Resume */}

            <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label className='text-md font-bold'>Resume</Label>
                    {
                      isResume? (<a className="text-blue-400 hover:underline" href={`${user.profile.resume}`} target="_blank" >{user.profile.resumeOriginalName}</a> ): (<div> NA </div>)
                    }
            </div>


        </div>


            {/* All applied jobs */}

            <div className=" max-w-4xl mx-auto bg-white rounded-2xl">
              <h1 className="font-bold text-lg my-2"> Applied Jobs</h1>
              <AppliedJobTable />
            </div>

            <UpdateProfileDialog open={open} setOpen={setOpen} />

    </div>
  )
}

export default profile