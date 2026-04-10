
import express from 'express'
import { loginDetailSchema, registerSchema } from './utils/typechecker.js'
import { prisma } from './prisma.js'
import { PrismaClientKnownRequestError } from '../generated/prisma/internal/prismaNamespace.js'
import jwt from 'jsonwebtoken'
import * as bcrypt from 'bcrypt'
import type { Prisma } from '../generated/prisma/client.js'
const router = express.Router()

const jwtSecret = process.env.JWT_TOKEN || '123456789'

router.post('/register', async(req,res)=>{
    const registerDetails =req.body
    const parserRegisterDetails = registerSchema.safeParse(registerDetails)

    if(!parserRegisterDetails.success){
        return res.status(400).json({error:"Invalid Register details"})
    }

    const {email, firstName, lastName, password, role} = parserRegisterDetails.data

    const hashedPassword = await bcrypt.hash(password,10)


    try{
        await prisma.user.create({
            data:{
                email,
                firstName,
                lastName,
                role,
                password:hashedPassword
            }
        })

        return res.status(201).json({message:'Registration successful'})
    }catch(error){
        console.error('[register error]', error)
        if(error instanceof PrismaClientKnownRequestError){
            if (error.code === 'P2002') {
                return res.status(409).json({ errorMessage: "A record with this email already exists." })
            }
        }

        return res.status(500).json({message:'Unexpected Error occured'})
    }

})

router.post('/login',async(req,res)=>{
    const loginDetails = req.body
    const pasrsedLoginDetails = loginDetailSchema.safeParse(loginDetails)

    if(!pasrsedLoginDetails.success){
        return res.status(400).json({error:'Invalid data format.'})
    }

    try{
        const user = await prisma.user.findUnique({
            where:{
                email:pasrsedLoginDetails.data.email
            }
        })
        if(!user){
            return res.status(404).json({error:"User not found"})
        }

        const isValid =await bcrypt.compare(pasrsedLoginDetails.data.password, user.password)
        
        if(!isValid){
            return res.status(403).json({error:'Password Incorrect'})
        }
        const {password,...rest} = user

        const tokenPayload = {...rest}

        const token = jwt.sign(tokenPayload,jwtSecret,{expiresIn:'1hr'})

        res.cookie('token', token, {
            httpOnly: true,    
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict', 
            maxAge: 24 * 60 * 60 * 1000, 
        });

        // Non-sensitive marker cookie for client-side bootstrapping checks.
        res.cookie('hasAuth', '1', {
            httpOnly: false,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({
            message:'login successful',
            payload:{...rest}
        })

    }catch(error){
        if(error instanceof PrismaClientKnownRequestError){
           if(error.code === '2025'){
                return res.status(401).json({error:'User not found'})
            }
        }

         if(error instanceof jwt.JsonWebTokenError){
            if (error.name === "TokenExpiredError" || error.name === "JsonWebTokenError") {
            return res.status(403).json({
                error: "User token has expired or is not valid",
                });
            }
        }
        return res.status(500).json({error:'Unexpected Error Occured'})
    }
})

export default router