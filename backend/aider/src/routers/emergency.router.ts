import { Router } from "express";
import { cancelEmergency, getEmergencies, getEmergency, reportEmergency, respondToEmergency, postMessage, getChats } from "../controllers/emergency.controller";
import { validateId } from "../middlewares/validateIdParam.middleware";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router()

router.post("/", reportEmergency)
router.get("/", getEmergencies)
router.get("/:id", validateId, getEmergency)
router.post("/:id/responders", authenticate, validateId, respondToEmergency)
router.put("/:id", validateId, cancelEmergency)
router.put("/:id/chats", validateId, postMessage)
router.get("/:id/chats", validateId, getChats)

export default router