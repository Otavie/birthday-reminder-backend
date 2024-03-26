"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const celebrants_1 = require("../models/celebrants");
// Validate Request Middleware
const validateRequest = (req, res, next) => {
    const { error } = celebrants_1.requestSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.message });
    }
    next();
};
exports.default = validateRequest;
