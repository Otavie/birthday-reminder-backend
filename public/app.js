"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./database/db"));
const routes_1 = __importDefault(require("./routes/routes"));
const node_cron_1 = __importDefault(require("node-cron"));
const celebrants_1 = __importDefault(require("./models/celebrants"));
const nodemailer_1 = __importDefault(require("nodemailer"));
dotenv_1.default.config();
const PORT = process.env.PORT;
const EMAIL_ADDRESS = process.env.EMAIL_ADDRESS;
const EMAIL_PASS = process.env.EMAIL_PASS;
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Enable Cors
app.use((0, cors_1.default)());
// Connect to Database
(0, db_1.default)();
app.use('/', routes_1.default);
const transporter = nodemailer_1.default.createTransport({
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
});
const sendBirthdayEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const emailOptions = {
        from: EMAIL_ADDRESS,
        to: email,
        subject: 'Happy Birthday!',
        text: 'Wishing you a fantastic birthday filled with joy, love and happiness!'
    };
    try {
        yield transporter.sendMail(emailOptions);
        console.log(`Birthday email sent to ${email}`);
    }
    catch (error) {
        console.error(`Error sending birthday messages to ${email}:`, error);
    }
});
const cronTask = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todayDate = new Date();
        const todayDay = todayDate.getDate(); // Get today's day
        const todayMonth = todayDate.getMonth(); // Get today's month
        const celebrants = yield celebrants_1.default.find({
            $expr: {
                $and: [
                    { $eq: [{ $subtract: [{ $month: '$dateOfBirth' }, 1] }, todayMonth] },
                    { $eq: [{ $dayOfMonth: '$dateOfBirth' }, todayDay] }
                ]
            }
        });
        if (celebrants.length) {
            // console.log(celebrants)
            console.log('Sending birthday email...');
            celebrants.forEach((celebrant) => {
                sendBirthdayEmail(celebrant.email);
            });
        }
        else {
            console.log('No celebrants today!');
            console.log(celebrants);
        }
    }
    catch (error) {
        console.log('Error checking for birthday:', error);
    }
});
// cron.schedule('*/1 * * * *', cronTask)          // Cron job runs every minute
node_cron_1.default.schedule('0 7 * * *', cronTask); // Cron job runs 7am every day
// cron.schedule('0 13 * * *', cronTask)         // Cron job runs at 1pm every day
app.listen(PORT, () => {
    console.log(`Server is running on PORT http://localhost:${PORT}`);
});
exports.default = app;
