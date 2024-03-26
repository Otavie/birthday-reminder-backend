import { Request, Response, NextFunction } from "express"
import { requestSchema } from "../models/celebrants"

// Validate Request Middleware
const validateRequest = (req: Request, res: Response, next: NextFunction) => {
    const { error } = requestSchema.validate(req.body)

    if (error) {
        return res.status(400).json({ message: error.message })
    }
    next()
}

export default validateRequest