"use strict";
// import dotenv from 'dotenv'
// import mongoose from 'mongoose';
// import Celebrants from '../../models/celebrants';
// dotenv.config()
// const DB_URI = process.env.DB_URI as string
// describe('Celebrants Model', () => {
//   beforeAll(async () => {
//     // Connect to the test database before running tests
//     await mongoose.connect(DB_URI);
//   });
//   afterAll(async () => {
//     // Disconnect from the test database after running tests
//     await mongoose.disconnect();
//   });
//   beforeEach(async () => {
//     // Clear the Celebrants collection before each test
//     await Celebrants.deleteMany({});
//   });
//   it('should create a new celebrant', async () => {
//     const celebrantData = {
//       username: 'test-user',
//       email: 'test-user@example.com',
//       dateOfBirth: new Date('2000-01-01'),
//     };
//     const newCelebrant = await Celebrants.create(celebrantData);
//     expect(newCelebrant.username).toBe(celebrantData.username);
//     expect(newCelebrant.email).toBe(celebrantData.email);
//     expect(newCelebrant.dateOfBirth).toEqual(celebrantData.dateOfBirth);
//   });
//   it('should not create a celebrant with duplicate username', async () => {
//     const celebrantData = {
//       username: 'test-user',
//       email: 'test1@example.com',
//       dateOfBirth: new Date('2000-01-01'),
//     };
//     // Create a celebrant with the same username
//     await Celebrants.create(celebrantData);
//     // Attempt to create another celebrant with the same username
//     try {
//       await Celebrants.create(celebrantData);
//       // If creation succeeds, fail the test
//       fail('Should not create a celebrant with duplicate username');
//     } catch (error: unknown) {
//       // If creation fails due to duplicate username, the test passes
//       expect(error as Error).toBe(11000); // MongoDB duplicate key error code
//     }
//   });
//   // Add more test cases as needed
// });
