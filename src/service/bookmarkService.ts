import db from "../db"

export const getBookmark = async (cardsId: number) => {
    return await db.bookmark.findMany({
        where: {
            cardsId,
        }, include: {
            user: {
                select: {
                    fullname: true,
                    email: true,
                    phone: true,
                    profile: {
                        select: {
                            avatar: true
                        }
                    }
                }
            }
        }
    })
}

export const getCurrentBookmark = async (cardsId: number, userId: number) => {
    return await db.bookmark.findFirst({
        where: {
            cardsId,
            userId
        }
    })
}

export const createBookmark = async (payload: { cardsId: number; userId: number }) => {
    // const existedThread = await db.bookmark.findFirst({
    //     where: {
    //         id?: payload.cardsId
    //     }
    // })

    // if (!existedThread) {
    //     throw new Error("Thread not found!")
    // }

    const existedBookmark = await db.bookmark.findFirst({
        where: {
            cardsId: payload.cardsId,
            userId: payload.userId
        }
    })

    if (existedBookmark) {
        await db.bookmark.deleteMany({
            where: {
                cardsId: payload.cardsId,
                userId: payload.userId
            }
        })
        return "Undo Bookmark Success"
    }

    await db.bookmark.create({
        data: {
            ...payload
        }
    })

    return "Bookmark Success"

}