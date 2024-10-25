
import Navbar from '../shared/Navbar'
import { USER_API_END_POINT } from '../../utils/constant'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setUser } from '@/redux/authSlice'

import { Label } from '../ui/label'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { useState } from 'react'
import { RadioGroup } from '../ui/radio-group'




const Login = () => {

    const navigate= useNavigate();
    const dispatch= useDispatch();

    const [input, setInput]= useState({
        email:"",
        password:"",
        role:"",
      })
    
      const changeEventHandler= (e)=>{
         setInput({ ...input,[e.target.name]: e.target.value  })
      }
    

      const submitHandler= async(e)=>{
        e.preventDefault();

        try {
            const res= await axios.post(`${USER_API_END_POINT}/login` ,input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true, // Include credentials (like cookies) with the request
            })

            if(res.data.success){
                dispatch(setUser(res.data.user));
                navigate("/")
                console.log("Login successfull", res.data.message)
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

            <h1 className='text-center font-bold text-2xl'>Login</h1>
            
            {/* login email */}
            <div className='my-2'>
                <Label className='m-2 p-2'>Email:</Label>
                <Input className='m-2 p-1 border border-gray-200'
                name="email"
                value={input.email}
                onChange={changeEventHandler}
                 type="email "></Input>
            </div>
            {/* login password */}
            <div className='my-2'>
                <Label className='m-2 p-2'>Password:</Label>
                <Input className='m-2 p-1 border border-gray-200'
                name="password"
                value={input.password}
                onChange={changeEventHandler}
                type="password"></Input>
            </div>
            {/* login radiovalue */}
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


            
         {/* loginbutton */}
         <Button className='bg-green-600 hover:bg-[#3d7d5b] w-full' type="submit">
            Login
         </Button>

        <span>Dont have an account? <Link to="/signup">SignUp</Link></span>
        </form>
    </div>
    </div>
  )
}

export default Login