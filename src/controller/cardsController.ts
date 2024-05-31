import { Request, Response } from "express"
import * as cardsService from "../service/cardsService"

export const createCard = async (req: Request, res: Response) => {
    try {

        const { body } = req
        body.userId = res.locals.user
        if (body.threadId) {
            body.threadId = +body.threadId;
        }
        const thread = await cardsService.createCard(body)
        res.json({
            status: true,
            message: "SUCCESS",
            data: thread,
        })
    } catch (error) {
        const err = error as unknown as Error
        res.status(500).json({
            status: false,
            message: err.message
        })
    }
}

export const getCards = async (req: Request, res: Response) => {
    try {
        const cards = await cardsService.getCards()

        res.json({
            status: true,
            message: "SUCCESS",
            data: cards,
        })

    } catch (error) {
        const err = error as unknown as Error
        res.status(500).json({
            status: false,
            message: err.message
        })
    }
}

export const getCard = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const cards = await cardsService.getCard(+id)

        res.json({
            status: true,
            message: "SUCCESS",
            data: cards,
        })

    } catch (error) {
        const err = error as unknown as Error
        res.status(500).json({
            status: false,
            message: err.message
        })
    }
}