import { DialogContent, Dialog, DialogTitle, DialogHeader, DialogFooter } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";

import { useState } from "react";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant.js";
import { setUser } from "@/redux/authSlice";

const UpdateProfileDialog = ({ open, setOpen }) => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    fullname: user?.fullname,
    email: user?.email,
    phoneNumber: user?.phoneNumber,
    bio: user?.profile?.bio,
    skills: user?.profile?.skills?.map((skill) => skill),
    file: user?.profile?.resume,
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      const res = await axios.post(
        `${USER_API_END_POINT}/profile/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setUser(res.data.user));
      }
    } catch (error) {
      console.log("error while updating", error);
    }

    setOpen(false);
    console.log(input);
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
          </DialogHeader>

          <form onSubmit={submitHandler}>
            <div className="grid gap-4 py-4">
              {/* Full Name */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="fullname">Full Name</Label>
                <Input
                  value={input.fullname}
                  onChange={changeEventHandler}
                  type="text"
                  className="col-span-3"
                  name="fullname"
                  id="fullname"
                />
              </div>
              {/* Email */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email">Email</Label>
                <Input
                  value={input.email}
                  onChange={changeEventHandler}
                  type="email"
                  className="col-span-3"
                  name="email"
                  id="email"
                />
              </div>
              {/* Phone Number */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  value={input.phoneNumber}
                  onChange={changeEventHandler}
                  className="col-span-3"
                  name="phoneNumber"
                  id="phoneNumber"
                />
              </div>
              {/* Bio */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="bio">Bio</Label>
                <Input
                  value={input.bio}
                  onChange={changeEventHandler}
                  className="col-span-3"
                  name="bio"
                  id="bio"
                />
              </div>
              {/* Skills */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="skills">Skills</Label>
                <Input
                  value={input.skills}
                  onChange={changeEventHandler}
                  className="col-span-3"
                  name="skills"
                  id="skills"
                />
              </div>
              {/* Resume */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="file">Resume</Label>
                <Input
                  onChange={fileChangeHandler}
                  className="col-span-3 hover:cursor-pointer"
                  accept="application/pdf"
                  type="file"
                  name="file"
                  id="file"
                />
              </div>
            </div>

            <DialogFooter>
              <Button type="submit" className="w-full my-4">Update</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateProfileDialog;