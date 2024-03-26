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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
describe('POST /birthdays', () => {
    let server;
    beforeAll(() => {
        // Start the Server before running the tests
        server = app_1.default.listen(0); // 0 will dynamically assign an available port
    });
    afterAll((done) => {
        // Close the server after running the tests
        server.close(done);
    });
    // Correct Details Format Validation
    it('should respond with status 201 when adding a new celebrant', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .post('/birthdays')
            .send({ username: 'test-user', email: 'test-user@example.com', dateOfBirth: '2000-01-01' });
        expect(res.status).toBe(201);
    }), 20000);
    // Missing email and dateOfBirth
    it('should respond with status 400 when missing required fields', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .post('/birthdays')
            .send({ username: 'test-user' });
        expect(res.status).toBe(400);
    }));
    // Duplicate email
    it('should respond with status 400 when email is already in use', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .post('/birthdays')
            .send({ username: 'test-user', email: 'test-user@example.com', dateOfBirth: '2000-01-01' });
        expect(res.status).toBe(400);
    }));
    // Invalid data types
    it('should respond with status 400 when data types are invalid', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .post('/birthdays')
            .send({ username: 1224, email: 'not-an-email', dateOfBirth: 'invalid-date' });
        expect(res.status).toBe(400);
    }));
});
