
import { Popover, PopoverContent, PopoverTrigger} from '../ui/popover';
import { Button } from '../ui/button';
import { Avatar,AvatarImage } from '../ui/avatar';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '../../utils/constant';
import { setUser } from '@/redux/authSlice';

const Navbar = () => {

    const dispatch= useDispatch(store=> store.auth)
    const navigate= useNavigate();

    const {user}= useSelector(store=> store.auth);

    const logoutHandler= async()=>{
        try {
            
            const res= await axios.get(`${USER_API_END_POINT}/logout`,{withCredentials:true});
            if(res.data.success){
                dispatch(setUser(null));
                navigate("/");
                console.log(res.data.message);
            }

        } catch (error) {
            console.log('error while logging out', error)
        }
    }

  return (
    <div className='bg-white'>
        <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>

            <div>
                <h1 className='text-2xl font-bold'>Job<span className='text-[#54ccb4]'>Sphere</span></h1>
            </div>
            <div className='flex items-center gap-12'>
                <ul className='flex items-center gap-5'>

                    {
                        user&& user.role==='recruiter'? 
                        (<>
                            <li> <Link to="/admin/companies">Companies</Link></li>
                            <li> <Link to='/admin/jobs'>Jobs</Link></li>
                        </>) :
                        (<>
                            <li> <Link to="/">Home</Link></li>
                            <li> <Link to='/jobs'>Jobs</Link></li>
                            <li> <Link to='/browse'>Browse</Link></li>
                        </>)
                    }
                    
                    
                </ul>

                {
                    !user?(
                        <div className='flex items-center gap-2'>
                        <Link to="/login"><Button variant="outline">Login</Button> </Link> 
                        <Link to="/signup"><Button className="bg-[#56be66] hover:bg-[#3d7d5b]">Signup</Button> </Link>
                    </div>
                    )
                    : (
                        <Popover>
    
                            <PopoverTrigger asChild>
                                    <Avatar className="cursor-pointer">
                                        <AvatarImage src={ `${user?.profile?.profilePhoto}` } alt="@shadcn" />
                                    </Avatar>
                            </PopoverTrigger>

                            <PopoverContent>
                                <div className=' flex gap-4 space-y-2'>
                                    <Avatar className="cursor-pointer">
                                        <AvatarImage src={ `${user?.profile?.profilePhoto}` } alt="@shadcn" />
                                    </Avatar>
                                    <h4 className='font-medium'>{ user?.fullname}</h4>
                                    <p>{user?.profile?.bio}</p>
                                </div>

                                <div className='m-1'>
                                    {
                                        user&& user.role==='student' && <><Button variant="link"> <Link to='/profile'>View Profile</Link> </Button></>
                                    }
                                    
                                    <Button onClick={logoutHandler} className="bg-red-300" variant="link">Logout</Button>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )
                }
            </div>
        </div>
    </div>
  )
}

export default Navbar