import { ICard } from "../../type/app";
import db from "../db"

export const createCard = async (payload: ICard) => {
    console.log("payload", payload)
    const thread = await db.cards.create({
        data: {
            image: payload.image,
            title: payload.title,
            article: payload.article,
            userId: payload.userId
        },
    })


    return thread
}

export const getCards = async () => {
    return await db.cards.findMany({
        orderBy: {
            id: "desc"
        }
    })
}

export const getCard = async (id: number) => {
    return await db.cards.findFirst({
        where: {
            id,
        }
    })
}
