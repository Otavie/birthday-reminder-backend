"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const DB_URI = process.env.DB_URI;
const dbConnection = () => {
    mongoose_1.default.Promise = Promise;
    mongoose_1.default.connect(DB_URI);
    mongoose_1.default.connection.on('connected', () => {
        console.log('Connected to database!');
    });
    mongoose_1.default.connection.on('disconnected', () => {
        console.log('Disconnected from database!');
    });
    mongoose_1.default.connection.on('error', (error) => {
        console.log('Error connecting to database:', error);
    });
};
exports.default = dbConnection;
