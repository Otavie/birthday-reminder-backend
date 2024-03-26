import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
const DB_URI = process.env.DB_URI as string


const dbConnection = () => {
    mongoose.Promise = Promise
    mongoose.connect(DB_URI)

    mongoose.connection.on('connected', () => {
        console.log('Connected to database!')
    })

    mongoose.connection.on('disconnected', () => {
        console.log('Disconnected from database!')
    })

    mongoose.connection.on('error', (error) => {
        console.log('Error connecting to database:', error)
    })
}

export default dbConnection