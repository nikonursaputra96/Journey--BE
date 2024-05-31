import { Router } from "express";
import authentication from "../middleware/authentication";
import { getBookmark, getCurrentBookmark, createBookmark } from "../controller/bookmarkController";


const bookmarkRouter = Router()

bookmarkRouter.post("/bookmark", authentication, createBookmark)
bookmarkRouter.get("/bookmark/:cardsId", authentication, getBookmark)
bookmarkRouter.get("/bookmark/:cardsId/", authentication, getCurrentBookmark)



export default bookmarkRouter