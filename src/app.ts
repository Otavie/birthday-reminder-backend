import express from 'express'
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

app.use('/', routes)

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
        const todayMonth = todayDate.getMonth()             // Get today's month
                
        const celebrants = await Celebrants.find({
            $expr: {
                $and: [
                    { $eq: [{ $subtract: [{ $month: '$dateOfBirth' }, 1] }, todayMonth] },
                    { $eq: [{ $dayOfMonth: '$dateOfBirth' }, todayDay] }
                ]
            }
        })

        if (celebrants.length) {
            // console.log(celebrants)
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
// cron.schedule('0 13 * * *', cronTask)         // Cron job runs at 1pm every day

app.listen(PORT, () => {
    console.log(`Server is running on PORT http://localhost:${PORT}`)
})

export default app