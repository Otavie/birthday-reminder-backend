import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import dbConnection from './database/db'
import routes from './routes/routes'
import cron from 'node-cron'
import Celebrants from './models/celebrants'
import nodemailer from 'nodemailer'
dotenv.config()

const PORT = process.env.PORT
const EMAIL_ADDRESS = process.env.EMAIL_ADDRESS
const EMAIL_PASS = process.env.EMAIL_PASS

const app = express()
app.use(express.json())

// Enable Cors
app.use(cors())

// Connect to Database
dbConnection()

app.use('/birthdays', routes)

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: EMAIL_ADDRESS,
        pass: EMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false
    }
})

const sendBirthdayEmail = async (email: string) => {
    const emailOptions = {
        from: EMAIL_ADDRESS,
        to: email,
        subject: 'Happy Birthday!',
        text: 'Wishing you a fantastic birthday filled with joy, love and happiness!'
    }

    try {
        await transporter.sendMail(emailOptions)
        console.log(`Birthday email sent to ${email}`)
    } catch (error) {
        console.error(`Error sending birthday messages to ${email}:`, error)
    }
}

const cronTask = async () => {
    try {
        const todayDate = new Date()
        const todayDay = todayDate.getDate()                // Get today's day
        const todayMonth = todayDate.getMonth() + 1             // Get today's month
                
        const celebrants = await Celebrants.find({
            $expr: {
                $and: [
                    // { $eq: [{ $subtract: [{ $month: '$dateOfBirth' }, 1] }, todayMonth] },
                    { $eq: [{ $month: '$dateOfBirth'}, todayMonth] },
                    { $eq: [{ $dayOfMonth: '$dateOfBirth' }, todayDay] }
                ]
            }
        })

        if (celebrants.length) {
            console.log('Sending birthday email...')
            celebrants.forEach((celebrant) => {
                sendBirthdayEmail(celebrant.email)
            })
        } else {
            console.log('No celebrants today!')
            console.log(celebrants)
        }

    } catch (error) {
        console.log('Error checking for birthday:', error)
    }
}

// cron.schedule('*/1 * * * *', cronTask)          // Cron job runs every minute
cron.schedule('0 7 * * *', cronTask)         // Cron job runs 7am every day
// cron.schedule('39 14 * * *', cronTask)         // Cron job runs at 1pm every day
// cron.schedule('0 17 * * *', cronTask)           // Cron job runs at 5pm every day
// cron.schedule('04 17 * * *', cronTask)           // Cron job runs at 5:04pm every day
// cron.schedule('30 17 * * *', cronTask)           // Cron job runs at 5:30pm every day
// cron.schedule('45 17 * * *', cronTask)           // Cron job runs at 5:45pm every day

app.listen(PORT, () => {
    console.log(`Server is running on PORT http://localhost:${PORT}`)
})

app.get('/', async (req: Request, res: Response) => {
    try {
            res.status(200).send({
            message: 'Birthday server in live!'
        })
    } catch (error) {
            res.status(500).json({
            message: 'Birthday server is NOT live!'
        })
    }
})

export default app