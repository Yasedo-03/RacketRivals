import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import dotenv from "dotenv";
import { UserModel } from "../models/Users.js";

dotenv.config();

const TOTAL_USERS = 20;

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    for (let i = 0; i < TOTAL_USERS; i++) {
      const user = new UserModel({
        email: faker.internet.email(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        club: faker.company.name(),
        rank: faker.number.int({ min: 500, max: 3000 }),
        password: "password",
        refreshToken: [faker.string.alphanumeric(20)],
      });
      await user.save();
    }

    console.log("Seeding completed!");
    mongoose.connection.close();
  } catch (error) {
    console.error("Failed to seed database:", error);
  }
}

seedDatabase();
