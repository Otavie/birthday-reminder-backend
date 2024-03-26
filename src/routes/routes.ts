import { Router } from 'express'
import { addCelebrant, getAllCelebrants } from "../controllers/celebrants"
import validateRequest from '../middleware/validate.request'
const router = Router()

router.get('/', getAllCelebrants)
router.post('/', validateRequest, addCelebrant)

export default router