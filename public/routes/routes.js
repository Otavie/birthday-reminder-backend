"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const celebrants_1 = require("../controllers/celebrants");
const validate_request_1 = __importDefault(require("../middleware/validate.request"));
const router = (0, express_1.Router)();
router.get('/', celebrants_1.getAllCelebrants);
router.post('/', validate_request_1.default, celebrants_1.addCelebrant);
exports.default = router;
