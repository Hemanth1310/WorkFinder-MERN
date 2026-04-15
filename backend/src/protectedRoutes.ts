import express from 'express'
import { prisma } from './prisma.js'
import type { JobPostingCreateInput } from '../generated/prisma/models.js'
import { jobPostingScema } from './utils/typechecker.js'
import { PrismaClientKnownRequestError } from '../generated/prisma/internal/prismaNamespace.js'
const router = express.Router()


router.get('/logout',(req,res)=>{
    res.clearCookie('token',{
            httpOnly: true,    
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict', 
            maxAge: 24 * 60 * 60 * 1000, 
    })
    res.clearCookie('hasAuth', {
            httpOnly: false,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000,
    })
    res.status(200).json({message:"successfully logged out"})
})
router.post('/user-details',async(req,res)=>{
    const email = req.userData?.email

    if(!email){
        return res.status(400).json({error:"Invalid Token."})
    }

    try{
        const user  = await prisma.user.findUnique({
            where:{
                email:email
            }
        }) 
        if(!user){
            return res.status(404).json({error:"User not found."})
        }
        const {password, ...rest} = user
        res.status(200).json({
            message:"User validated successfully",
            payload:rest
        })
    }catch(error){
         return res.status(404).json({error:"User not found."})
    }
})

router.post('/make-a-post',async(req,res)=>{
   const userPayload =  req.userData 
   const jobPosting = req.body
   const parsedJobPosting =  jobPostingScema.safeParse(jobPosting)

   if(!parsedJobPosting.success){
    return res.status(400).json({error:"Invalid job details"})
   }

   if(!userPayload){
    return res.status(400).json({error:"Invalid User"})
   }

   try{
    const user  = await prisma.user.findFirst({
        where:{
            id:userPayload?.id
        }
    })

    if(!user){
        return res.status(400).json({error:"Invalid User"})
    }
    await prisma.jobPosting.create({
        data:{
            ...parsedJobPosting.data,
            employerId:user.id
        }
    })
    return res.status(201).json({message:"Job posted"})
   }catch(error){
        if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "2002") {
            return res
            .status(401)
            .json({ errorMessage: "Unable to porcess request." });
        }
        }
        console.error("Unexpected Error:", error);
        return res.status(500).json({ errorMessage: "Internal server error" });
   }
})

export default router