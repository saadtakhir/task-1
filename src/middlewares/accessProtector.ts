import { NextFunction, Request, Response } from "express"
import { env } from 'process'

export async function checkSuperKey(req: Request, res: Response, next: NextFunction) {
    const accessKey = req.headers['x-access-key'] as string
    if(!accessKey){
        return res.status(409).json({
            message: "Super key not provided"
        })
    }
    else{
        const superKey = env.SECRET_KEY
        if(accessKey === superKey) {
            next()
        }
        else{
            res.status(403).json({
                message: "Invalid super key"
            })
        }
    }
}