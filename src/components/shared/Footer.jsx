import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <div className='m-4 p-6 flex justify-between grid grid-cols-2 bg-slate-50'>
        <div>
                <h1 className='text-2xl font-bold'>Job<span className='text-[#54ccb4]'>Sphere</span></h1>
                <p className='text-sm'>2024 JobSphere. All rights reserved</p>
        </div>
        <div className='grid grid-cols-3 mt-4'>
                <div><Link to="/">Home</Link></div>
                <div><Link to="/jobs">Jobs</Link></div>
                <div><Link to="/browse">Browse</Link></div>
        </div>
    </div>
  )
}

export default Footer