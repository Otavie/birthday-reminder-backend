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
exports.getAllCelebrants = exports.addCelebrant = void 0;
const celebrants_1 = __importDefault(require("../models/celebrants"));
const addCelebrant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, dateOfBirth } = req.body;
        if (!username || !email || !dateOfBirth) {
            return res.status(400).json({
                message: 'Username, email or date of birth is missing!',
                state: 'EmptyFields'
            });
        }
        const existingEmail = yield celebrants_1.default.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({
                message: 'Email already in use!',
                state: 'DuplicateEmail'
            });
        }
        const existingUsername = yield celebrants_1.default.findOne({ username });
        if (existingUsername) {
            res.status(400).json({
                message: 'Username already in use!',
                state: 'DuplicateUsername'
            });
        }
        const newCelebrant = new celebrants_1.default({ username, email, dateOfBirth });
        yield newCelebrant.save();
        res.status(201).json({
            message: 'Celebrant added successfully!',
            newCelebrant
        });
    }
    catch (error) {
        console.log('Error adding celebrant:', error);
        // res.status(500).json({ message: 'Error adding celebrant!' })
    }
});
exports.addCelebrant = addCelebrant;
const getAllCelebrants = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allCelebrants = yield celebrants_1.default.find();
        res.status(200).json({
            message: 'All celebrants!',
            allCelebrants
        });
    }
    catch (error) {
        console.log('Error in getting all celebrants:', error);
        res.status(400).json({ message: 'Unable to get all celebrants!' });
    }
});
exports.getAllCelebrants = getAllCelebrants;
