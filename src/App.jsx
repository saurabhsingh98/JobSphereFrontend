
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/Auth/Login'
import SignUp from './components/Auth/SignUp'
import Home from './components/Home'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'

import Companies from './components/Admin/Companies'
import CreateCompany from './components/Admin/CreateCompany'
import EditCompany from './components/Admin/EditCompany'
import JobsAdmin from './components/Admin/JobsAdmin'
import PostJob from './components/Admin/PostJob'
import Applicants from './components/Admin/Applicants'


const appRouter= createBrowserRouter([
    {
      path:'/',
      element:<Home/>

    },
    {
      path:'/login',
      element:<Login/>

    },
    {
      path:'/signUp',
      element:<SignUp/>

    },
    {
      path:'/jobs',
      element:<Jobs/>
    },
    {
      path:'description/:id',
      element:<JobDescription/>
    },
    {
      path:'/Browse',
      element:<Browse/>
    },
    {
      path:'/profile',
      element:<Profile/>
    },

    // for admin
    {
      path:'/admin/companies',
        element:<Companies/>
    },
    {
      path:'/admin/companies/create',
        element:<CreateCompany/>
    },
    {
      path:'/admin/companies/:id',
      element: <EditCompany />
    },
    {
      path:'/admin/jobs',
      element: <JobsAdmin />
    },
    {
      path:'/admin/jobs/post',
      element:<PostJob/>
    },
    {
      path:'/admin/jobs/:id/applicants',
      element:<Applicants/>
    }
    

])

function App() {

  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  )
}

export default App
