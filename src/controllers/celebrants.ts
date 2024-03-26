import { Request, Response } from "express"
import Celebrants from "../models/celebrants"

export const addCelebrant = async (req: Request, res: Response) => {
    try {
        const { username, email, dateOfBirth } = req.body

        if (!username || !email || !dateOfBirth) {
            return res.status(400).json({ 
                message: 'Username, email or date of birth is missing!',
                state: 'EmptyFields'
             })
        }

        const existingEmail = await Celebrants.findOne({ email })
        if  (existingEmail) {
            return res.status(400).json({ 
                message: 'Email already in use!',
                state: 'DuplicateEmail'
             })
        }

        const existingUsername = await Celebrants.findOne({ username })
        if (existingUsername) {
            res.status(400).json({ 
                message: 'Username already in use!',
                state: 'DuplicateUsername'
             })
        }

        const newCelebrant = new Celebrants({ username, email, dateOfBirth })
        await newCelebrant.save()

        res.status(201).json({
            message: 'Celebrant added successfully!',
            newCelebrant
        })

    } catch (error) {
        console.log('Error adding celebrant:', error)
        // res.status(500).json({ message: 'Error adding celebrant!' })
    }
}

export const getAllCelebrants = async (req: Request, res: Response) => {
    try {
        const allCelebrants = await Celebrants.find()

        res.status(200).json({
            message: 'All celebrants!',
            allCelebrants
        })

    } catch (error) {
        console.log('Error in getting all celebrants:', error)
        res.status(400).json({ message: 'Unable to get all celebrants!' })
    }
}