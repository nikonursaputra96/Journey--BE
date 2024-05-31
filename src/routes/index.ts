import { Router } from "express";
import userRouter from "./userRouter";
import cardRouter from "./cardRouter";
import profileRouter from "./profileRouter";
import bookmarkRouter from "./bookmarkRouter";


const router = Router()

router.use("/", userRouter)
router.use("/", cardRouter)
router.use("/", profileRouter)
router.use("/", bookmarkRouter)

export default router