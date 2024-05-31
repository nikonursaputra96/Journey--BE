import { Router } from "express";
import { getCard, getCards, createCard } from "../controller/cardsController";
import authentication from "../middleware/authentication";

const cardRouter = Router()

cardRouter.post("/card", authentication, createCard)
cardRouter.get("/cards", getCards)
cardRouter.get("/card/:id", getCard)

export default cardRouter