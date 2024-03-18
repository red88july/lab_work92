import { WebSocket } from 'ws';
import {Model} from "mongoose";

export interface ActiveConnections {
    [id: string]: WebSocket;
}

export interface IncomingMessage {
    type: string;
    payload: string;
}
export interface UserTypes {
    username: string;
    displayName: string;
    password: string;
}

export interface UserDataExtendsSchema extends UserTypes {
    token: string;
    role: string;
}

interface UserMethods {
    checkPassword(password: string): Promise<Boolean>;
    generatedToken();
}

type UserModel = Model<UserDataExtendsSchema, {}, UserMethods>

