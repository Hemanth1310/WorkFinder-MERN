import express from 'express'
import { prisma } from './prisma.js'

const router = express.Router()

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

export default router