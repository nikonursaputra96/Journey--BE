import { Request, Response } from "express";
import * as profileService from "../service/profileService"

export const updateProfile = async (req: Request, res: Response) => {
    try {
        const userId = res.locals.user
        const { body } = req


        await profileService.updateProfile(userId, body)

        res.json({
            status: true,
            message: "SUCCESS",
        })
    } catch (error) {
        const err = error as unknown as Error
        res.status(500).json({
            status: false,
            message: err.message
        })
    }

}

export const getProfile = async (req: Request, res: Response) => {
    try {
        const userId = res.locals.user
        const profile = await profileService.getProfile(userId)

        res.json({
            status: true,
            message: "SUCCESS",
            data: profile
        })
    } catch (error) {
        const err = error as unknown as Error
        res.status(500).json({
            status: false,
            message: err.message
        })
    }
}