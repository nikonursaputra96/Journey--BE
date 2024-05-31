import db from "../db"
import { registerValidation } from "../lib/validation/register"
import { IRegister } from "../../type/app"
import * as bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const userService = async (userId: number) => {
    return await db.user.findMany({
        where: {
            id: userId
        }, include: {
            profile: {
                select: {
                    avatar: true
                }
            }
        }
    })
}

export const getUsers = async (id: number) => {
    return await db.user.findFirst({
        where: {
            id,
        }
    })
}

export const register = async (payload: IRegister) => {
    const { error, value } = registerValidation.validate(payload)
    if (error) {
        throw new Error(error.details[0].message)
    }
    const isExist = await db.user.findFirst({
        where: {
            OR: [
                {
                    email: value.email
                },
            ]
        }
    })
    if (isExist) {
        throw new Error("Email already exist")
    }

    const hashPassword = await bcrypt.hash(value.password, 10)
    value.password = hashPassword

    const user = await db.user.create({
        data: {
            ...value
        }
    })

    const profile = await db.profile.create({
        data: {
            userId: user.id
        }
    })

    return { user, profile }
}

export const login = async (email: string, password: string): Promise<string> => {
    const user = await db.user.findFirst({
        where: {
            OR: [
                {
                    email,
                },
                {
                    fullname: email
                }
            ]
        }
    })

    if (!user) {
        throw new Error("Email OR Password not valid")
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error("Email OR Password not valid")
    }

    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY!, { expiresIn: "1d" })

    return token
}


export default userService