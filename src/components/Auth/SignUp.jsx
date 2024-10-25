import { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import { USER_API_END_POINT } from '../../utils/constant'
import axios from 'axios'

//schadCNui components
import { RadioGroup } from '../ui/radio-group'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

const SignUp = () => {

    const navigate= useNavigate();

    const [input, setInput]= useState({
        fullname:"",
        email:"",
        phoneNumber:"",
        password:"",
        role:"",
        file:""
      })
    
      const changeEventHandler= (e)=>{
         setInput({ ...input,[e.target.name]: e.target.value  })
      }
    
    //profile photo taking funciton
      const changeFileHandler= (e)=>{
        setInput({...input , file:e.target.files?.[0]})
      }

    //   form submit function
      const submitHandler= async(e)=>{
            e.preventDefault();
            const formData=new FormData();
            formData.append("fullname", input.fullname);
            formData.append("email", input.email);
            formData.append("phoneNumber", input.phoneNumber);
            formData.append("password", input.password);
            formData.append("role", input.role);

            if(input.file!=""){
                formData.append("file", input.file);
            }
            try {
                const res= await axios.post(`${USER_API_END_POINT}/register` ,formData, {
                    headers:{
                        "Content-Type":"multipart/form-data"
                    },
                    withCredentials:true,
                })
                console.log(res);

                if(res.data.success){
                    navigate("/login")
                    console.log("Signed up successfull ", res.data.message)
                }

            } catch (error) {
                console.log("error while sign up from SignUp.jsx ", error)
            }
      }

  return (
    <div>
        <Navbar/>
        <div className=' flex items-center justify-center max-w-7xl mx-auto'>


            <form onSubmit={submitHandler} className='w-1/2 border border-gray-300 rounded-md p-4 my-10'>

                <h1 className='text-center font-bold text-2xl'>SignUp</h1>

                {/* fullname input */}
               <div className='my-2'>
                    <Label className='m-2 p-2'>Full Name:</Label>
                    <Input className='m-2 p-1 border border-gray-200' 
                    value={input.fullname}
                    name="fullname"
                    onChange= {changeEventHandler}
                    placeholder="abc"
                    type="text"></Input>
                </div>
                {/* email input */}
                <div className='my-2'>
                    <Label className='m-2 p-2'>Email:</Label>
                    <Input className='m-2 p-1 border border-gray-200'
                    value={input.email}
                    name="email"
                    onChange={changeEventHandler}
                    placeholder="abc@xyz"
                    type="email "></Input>
                </div>
                {/* phone Number */}
                <div className='my-2'>
                    <Label className='m-2 p-2'>PhoneNumber:</Label>
                    <Input className='m-2 p-1 border border-gray-200'
                    value={input.phoneNumber}
                    name="phoneNumber"
                    onChange={changeEventHandler}
                    placeholder="95xxxxxxxx"
                    type="number"></Input>
                </div>
                {/* password */}
                <div className='my-2'>
                    <Label className='m-2 p-2'>Password:</Label>
                    <Input className='m-2 p-1 border border-gray-200' 
                    value={input.password}
                    name="password"
                    onChange={changeEventHandler}
                    type="password"></Input>
                </div>

            {/* radio input */}

            <div className='flex items-center justify-between'>
                 <RadioGroup className='flex items-center gap-4 my-5'>
        <div>
            <Input 
                type="radio"
                name="role"
                value="student"
                checked={input.role === 'student'}
                onChange={changeEventHandler}  // Use changeEventHandler here
                className="cursor-pointer size-4"
            />
            <Label htmlFor='r1'>Student</Label>
        </div>
        <div>
            <Input 
                type="radio"
                name="role"
                value="recruiter"
                checked={input.role === 'recruiter'}
                onChange={changeEventHandler}  // Use changeEventHandler here
                className="cursor-pointer size-4"
            />
            <Label htmlFor='r2'>Recruiter</Label>
        </div>
                 </RadioGroup>
            </div>

            {/* Dpinput */}
            <div className='my-2'>
                    <Label>Profile</Label>
                    <Input
                        accept="image/*"
                        type='file'
                        onChange={changeFileHandler}
                        className="cursor-pointer"

                    />
            </div>
                
             {/* signUpbutton */}
             <Button className='bg-green-600 hover:bg-[#3d7d5b] w-full' type="submit">
                SignUp
             </Button>

            <span>Already have an account? <Link to="/login">Login</Link></span>
            </form>
        </div>
    </div>
  )
}

export default SignUp