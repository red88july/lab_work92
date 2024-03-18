import express, {query} from 'express';
import expressWs from 'express-ws';
import mongoose, {connection, Types} from "mongoose";
import crypto from "crypto";
import cors from 'cors';

import {ActiveConnections, IncomingMessage} from "./types";
import connectToDB from "./connectToDB";
import {usersRouter} from "./routers/users";
import Messages from "./models/Messages";
import User from "./models/User";
import Message from "./models/Messages";

const app = express();
const router = express.Router();
const port = 8000;

app.use(express.json());
app.use(cors());
app.use('/users', usersRouter);

expressWs(app);
app.use(router);

const activeConnections: ActiveConnections = {};

router.ws('/chatApp', (ws, req) => {
    const id = crypto.randomUUID();
    activeConnections[id] = ws;
    console.log('client connected! id=', id);

    let username = '';
    let token = '';
    let userId = '';

    ws.send(JSON.stringify({type: 'WELCOME', payload: 'Welcome! You have connected to the chat!'}));

    ws.on('message', async (message) => {
        const decodedMessage = JSON.parse(message.toString()) as IncomingMessage;

        if (decodedMessage.type === 'USER_ID') {
            userId = decodedMessage.payload;
        }
        if (decodedMessage.type === 'LOGIN') {
            token = decodedMessage.payload;
        }
        if (decodedMessage.type === 'SET_USERNAME') {
            username = decodedMessage.payload;
        }
        if (decodedMessage.type === 'SET_MESSAGE') {
            try {
                const newMessage = new Message({
                    username: userId,
                    displayName: username,
                    message: decodedMessage.payload,
                });

                await newMessage.save();

                Object.values(activeConnections).forEach(connection => {
                    const outgoingMessage = {
                        type: 'NEW_MESSAGE', payload: {
                            userId: userId,
                            author: username,
                            token: token,
                            message: decodedMessage.payload,
                        }
                    }

                    connection.send(JSON.stringify(outgoingMessage));
                })

            } catch (error) {
                console.error("Error saving message:", error);
            }
        }
    });


    ws.on('close', () => {
        console.log('client disconnected! id=', id);
        delete activeConnections[id];
    });
});

const run = async () => {
    await mongoose.connect(connectToDB.db);

    app.listen(port, () => {
        console.log(`Server started on ${port} port!`);
    });

    process.on('exit', () => {
        mongoose.disconnect();
    });

};

void run();