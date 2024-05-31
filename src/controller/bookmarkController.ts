import { Request, Response } from "express"
import * as bookmarkService from "../service/bookmarkService"

export const getBookmark = async (req: Request, res: Response) => {
    try {
        const { threadId } = req.params
        const likes = await bookmarkService.getBookmark(+threadId)

        res.json({
            status: true,
            message: "SUCCESS",
            data: {
                user: likes
            }
        })
    } catch (error) {
        const err = error as unknown as Error
        res.status(500).json({
            status: false,
            message: err.message
        })
    }
}

export const createBookmark = async (req: Request, res: Response) => {
    try {
        const { cardsId } = req.body
        const userId = res.locals.user

        const like = await bookmarkService.createBookmark({
            cardsId,
            userId
        })

        res.json({
            status: true,
            message: like,
        })
    } catch (error) {
        const err = error as unknown as Error
        res.status(500).json({
            status: false,
            message: err.message
        })
    }

}

export const getCurrentBookmark = async (req: Request, res: Response) => {
    try {
        const { cardsId } = req.params
        const userId = res.locals.user

        const like = await bookmarkService.getCurrentBookmark(+cardsId, +userId)


        res.json({
            status: true,
            message: "success",
            data: {
                like,
            },
        });
    } catch (error) {
        const err = error as unknown as Error
        res.status(500).json({
            status: false,
            message: err.message
        })
    }
}