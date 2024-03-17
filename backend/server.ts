import express from 'express';
import expressWs from 'express-ws';
import mongoose, {connection} from "mongoose";
import crypto from "crypto";
import cors from 'cors';

import {ActiveConnections, IncomingMessage} from "./types";
import connectToDB from "./connectToDB";
import {usersRouter} from "./routers/users";

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
    console.log('client connected! id=', id);
    activeConnections[id] = ws;
    let username = 'Anonymous';
    let token = '';
    let onlineUser = [];

    ws.send(JSON.stringify({type: 'WELCOME', payload: 'Welcome! You have connected to the chat!'}));

    ws.on('message', (message) => {
        const decodedMessage = JSON.parse(message.toString()) as IncomingMessage;

        if (decodedMessage.type === 'LOGIN') {
            token = decodedMessage.payload;
        }

        if (decodedMessage.type === 'SET_USERNAME') {
            username = decodedMessage.payload;
        } else if (decodedMessage.type === 'SET_MESSAGE') {
            Object.values(activeConnections).forEach(connection => {
                const outgoingMessage = {type: 'NEW_MESSAGE', payload: {
                        author: username,
                        token: token,
                        message: decodedMessage.payload,
                    }}

                connection.send(JSON.stringify(outgoingMessage));
            })
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