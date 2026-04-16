import React, { useState } from 'react'
import { useAuthContextData } from '../../utils/useAuthContextData'
import { Navigate } from 'react-router'
import { jobPostingSchema } from '../../utils/typechecker'
import axios, { AxiosError } from 'axios'
import { toast } from 'react-toastify'

const BASE_API_URL = import.meta.env.VITE_API_URL

const MakeAPost = () => {
    const {userData} = useAuthContextData()

     const [errors,setErrors] = useState({
      title:'',
      description:'',
      companyName:'',
      location:'',
      salary:'',
      jobType:'',
      expereince:'',
      category:'',
      server:''
    })
    
    const jobTypeOptions = ["Fulltime" , "Internship" , "Freelance"]
    const experienceOptions= [ "Experienced" , "Intermediate" , "Begginer"]
    const categoryOPtions =["Software" , "Design" , "Sales" , "Marketing" , "Finance"]
    
    if(userData.role==='CANDIDATE'){
        return <Navigate to='/'/>
    }

    const handleForm = async(formData:FormData)=>{
      const jobDetails = Object.fromEntries(formData.entries())
      console.log(jobDetails)

      const parsedJobDetails = jobPostingSchema.safeParse(jobDetails)

      if(!parsedJobDetails.success){
        for(const issue of parsedJobDetails.error.issues){
            setErrors(prev=>({...prev,[issue.path[0]]:issue.message}))
        }
        return
      }

      try{
        await axios.post(`${BASE_API_URL}/api/private/make-a-post`,parsedJobDetails.data)
         toast.success('Job is now posted',{
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: false,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                            })
      }catch(error){
        if(error instanceof AxiosError){
          setErrors((prev)=>({...prev,server:error.response.data.error}))
        }else{
          setErrors(prev=>({...prev,apiResponse:"Unexpected Error Occured. Please Try again later!"}))
        }
        toast.error('Failed to post, tey again!',{
                                        position: "top-right",
                                        autoClose: 5000,
                                        hideProgressBar: false,
                                        closeOnClick: false,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                        theme: "light",
                    })
      }

    }
    
  return (
    <div className='w-full h-full'>
      <h1 className='text-2xl font-semibold '>Make A Post</h1>
      <form action={handleForm} className='w-full h-full flex flex-col sm:flex-row justify-center gap-10 sm:p-10 '>
        <div className='flex-1 flex flex-col justify-between h-full'>
            <div className='flex flex-col gap-1'>
                <label className=' '>Title</label>
                <input name='title' className='pl-3 border-2 border-gray-300 h-10 rounded-lg'></input>
                {errors.title && <p className='text-sm text-red-500'>{errors.title}</p>}
            </div>
            <div className='flex flex-col gap-1'>
                <label className=' '>Company Name</label>
                <input name='companyName' type='text' className='pl-3 border-2 border-gray-300 h-10 rounded-lg'></input>
                 {errors.companyName && <p className='text-sm text-red-500'>{errors.companyName}</p>}
            </div>
             <div className='flex flex-col gap-1'>
                <label className=' '>Location</label>
                <input name='location' className='pl-3 border-2 border-gray-300 h-10 rounded-lg'></input>
                 {errors.location && <p className='text-sm text-red-500'>{errors.location}</p>}
            </div>
             <div className='flex flex-col gap-1'>
                <label className=' '>Salary</label>
                <input name='salary' type='number' className='pl-3 border-2 border-gray-300 h-10 rounded-lg'></input>
                 {errors.salary && <p className='text-sm text-red-500'>{errors.salary}</p>}
            </div>
            <div className='flex w-full gap-5'>
                <div className='flex:1 w-full flex flex-col gap-1 '>
                  <label className=' '>Offer Type</label>
                  <select name='jobType' defaultValue="" className='pl-3 border-2 border-gray-300 h-10 rounded-lg'>
                    {jobTypeOptions.map(opt=><option value={opt} key={opt}>{opt}</option>)}
                  </select>
                   {errors.jobType && <p className='text-sm text-red-500'>{errors.jobType}</p>}
                </div>
                <div className=' flex:1 w-full flex flex-col gap-1'>
                  <label className=' '>Experience Requirements</label>
                  <select name='experience' defaultValue="" className='pl-3 border-2 border-gray-300 h-10 rounded-lg'>
                    {experienceOptions.map(opt=><option value={opt} key={opt}>{opt}</option>)}
                  </select>
                   {errors.expereince && <p className='text-sm text-red-500'>{errors.expereince}</p>}
                </div>
              
            </div>
            <div className='flex flex-col gap-1 '>
                  <label className=' '>Category</label>
                  <select name='category' defaultValue="" className='pl-3 border-2 border-gray-300 h-10 rounded-lg'>
                    {categoryOPtions.map(opt=><option value={opt} key={opt}>{opt}</option>)}
                  </select>
                   {errors.category && <p className='text-sm text-red-500'>{errors.category}</p>}
              </div>
        </div>
        <div className='flex-1 h-full flex flex-col gap-5'>
            <div className='flex flex-col gap-1 h-full'>
              <label className=' '>Description</label>
              <textarea name='description' className='pl-3 p-3 border-2 border-gray-300 rounded-lg h-full'></textarea>
              {errors.description && <p className='text-sm text-red-500'>{errors.description}</p>}

            </div>
            {errors.server && <p className='text-sm text-red-500'>{errors.server}</p>}

            <div className='w-full flex justify-end'>
            <button type='submit' className=' bg-brand-primary text-white w-1/3 p-2 rounded-lg'>Submit</button>
            </div>
            
        </div>
      </form>
    </div>
  )
}

export default MakeAPost