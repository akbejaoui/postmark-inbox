
import * as express from "express"

import conversationController from "../controllers/conversation.controller"

import routerHandler from "./routerHandler"
import { SendEmailValidationMiddleware } from "./middlewares/conversation.middleware"

const router = express.Router()

router.post("/email", SendEmailValidationMiddleware(),  routerHandler(conversationController.sendEmail))
router.get("/email",  routerHandler(conversationController.getAllEmails))

export default router
