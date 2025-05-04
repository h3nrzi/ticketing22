import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import app from "../app";

let mongo: MongoMemoryServer;

// Connect to MongoDB before all tests
beforeAll(async () => {
	process.env.JWT_KEY = "asdf";

	mongo = await MongoMemoryServer.create();
	const mongoUri = mongo.getUri();

	await mongoose.connect(mongoUri);
});

// Clear the database before each test
beforeEach(async () => {
	const collections = await mongoose.connection.db.collections();
	for (let collection of collections) await collection.deleteMany();
});

// Close the MongoDB and Mongoose connection after all tests
afterAll(async () => {
	if (mongo) await mongo.stop();
	await mongoose.connection.close();
});
