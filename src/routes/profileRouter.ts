import { Router } from "express";
import authentication from "../middleware/authentication";
import { getProfile, updateProfile } from "../controller/profileController";


const profileRouter = Router()

profileRouter.patch("/profile", authentication, updateProfile)
profileRouter.get("/profile", authentication, getProfile)
profileRouter.get("/profile/:id", authentication, getProfile)

export default profileRouter