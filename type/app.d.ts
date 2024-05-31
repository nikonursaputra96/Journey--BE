export interface IRegister {
    fullname: string
    password: string
    phone: string
    email: string

}

// export enum EStatus {
//     SUCCESS = "SUCCESS",
//     FAILED = "FAILED"

// }

export type AuthMiddlewareData = {
    id: string
}

export interface IProfile {
    avatar?: string
    userId?: number
}

export interface ICard {
    id?: number;
    image?: string;
    title?: string;
    article?: string
    userId: number;
}

// export interface IImage {
//     id?: number
//     image: string
//     threadId: number
// }