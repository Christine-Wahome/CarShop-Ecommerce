import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import path from 'path'
import {  NextFunction, Request, Response } from 'express'

dotenv.config({ path: path.resolve(__dirname, '../../.env')})


export const verifyToken = (req:Request, res:Response, next:NextFunction) => {
    //getting the token
    const token = req.headers['token'] as string

    try {
        if(!token){
            res.status(401).json({error:'Forbbiden'})
        }
        
        //getting decoded data in the payload
        const decodedData = jwt.verify(token, process.env.SECRETKEY as string)
    } catch (error:any) {
        res.status(401).json(error.message)
    }
}