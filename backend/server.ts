import express from 'express';
import expressWs from 'express-ws';
import mongoose from "mongoose";
import crypto from "crypto";
import cors from 'cors';

import {ActiveConnections} from "./types";
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




// const activeConnections: ActiveConnections = {};
//
// router.ws('/chatApp', (ws, req) => {
//     const id = crypto.randomUUID();
//     console.log('client connected! id=', id);
//     activeConnections[id] = ws;
//
//     // ws.on('message', (message: string) => {
//     //     const decodedDots = JSON.parse(message);
//     //
//     //     if (decodedDots.type === 'SET_DOTS') {
//     //         Object.values(activeConnections).forEach(connection => {
//     //             const outgoingDots = {type: 'NEW_DOTS', payload: decodedDots.payload}
//     //             connection.send(JSON.stringify(outgoingDots));
//     //         })
//     //     }
//     // });
//
//     ws.on('close', () => {
//         console.log('client disconnected! id=', id);
//         delete activeConnections[id];
//     });
// });

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