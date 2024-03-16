import mongoose from "mongoose";
import crypto from "crypto";
import connectToDB from "./connectToDB";
import User from "./models/User";

const dropColletction = async (db: mongoose.Connection, collectionsName: string) => {
    try {
        await db.dropCollection(collectionsName);
    } catch (e) {
        console.log(`Collection ${collectionsName} was missing, skipping drop...`)
    }
}

const run = async () => {
    await mongoose.connect(connectToDB.db);
    const db = mongoose.connection;

    const collections = ['users', 'artists', 'albums', 'tracks'];

    for (const collectionsName of collections) {
        await dropColletction(db, collectionsName);
    }

    await User.create([
        {
            username: 'ivanov.i',
            displayName: 'Ivanov Ivan',
            password: "Ivanov_123#",
            role: 'user',
            token: crypto.randomUUID(),
        },  {
            username: 'petrov.s',
            displayName: 'Petrov Sergej',
            password: "Petrov_123#",
            role: 'user',
            token: crypto.randomUUID(),
        }
    ])

    await db.close();
};

void run();