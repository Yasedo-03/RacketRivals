import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import dotenv from "dotenv";
import { UserModel } from "../models/Users.js";
import { TournamentModel } from "../models/Tournaments.js";

dotenv.config();

const TOTAL_USERS_FOR_TOURNAMENT = 8;

async function createTournamentWithUsers() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    let users = await UserModel.find().limit(TOTAL_USERS_FOR_TOURNAMENT).exec();

    while (users.length < TOTAL_USERS_FOR_TOURNAMENT) {
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
      users.push(user);
    }

    users.sort((a, b) => b.rank - a.rank);

    const tournament = new TournamentModel({
      organizer: "64fe32a5dcc00d6119463bb8",
      name: faker.company.catchPhrase(),
      start_date: faker.date.future(),
      end_date: faker.date.future(),
      start_hour: "19:00",
      location: faker.location.city(),
      format: "Round Robin",
      description: faker.lorem.sentences(3),
      number_of_participants: TOTAL_USERS_FOR_TOURNAMENT,
      accesibility: "Public",
      contact: {
        email: faker.internet.email(),
        phone: faker.phone.number("## ## ## ## ##"),
      },
      price: faker.commerce.price(),
      uniqueCode: `#${faker.string.alphanumeric(5)}`,
      participants: users.map((user) => user._id),
      seeds: users.map((user) => user._id),
    });

    await tournament.save();

    console.log("Tournament creation completed!");
    mongoose.connection.close();
  } catch (error) {
    console.error("Failed to create tournament:", error);
  }
}

createTournamentWithUsers();
