
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestJobs from './LatestJobs'
import Footer from './shared/Footer'
import useGetAllJobs from '@/customhooks/usegetAllJobs'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'



const Home = () => {

  useGetAllJobs();
  //iske call hote hi redux store me sari jobs store ho jayengi
  

  //admin home page

   const navigate= useNavigate();
   const {user}= useSelector(store=> store.auth);

  useEffect(()=>{
      
      if(user&& user.role ==='recruiter'){
          navigate('/admin/companies')
      }
  },[]);


  return (
    <div>
        <Navbar/>
        <HeroSection/>
        <CategoryCarousel/>
        <LatestJobs/>
        <Footer/>
    </div>
  )
}

export default Home