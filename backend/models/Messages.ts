import {Schema, model, HydratedDocument, Types} from "mongoose";

import User from "./User";

const MessageSchema = new Schema({
    username: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        validate: {
            validator: async (value: Types.ObjectId)=> {
                const userNew = await User.findById(value);
                return Boolean(userNew);
            },
            message: `User not specified!`,
        },
    },

    displayName: {
        type: String,
        required: true,
    },

    message: {
        type: String,
        required: true,
    },

}, { versionKey: false });

const Message = model('Message', MessageSchema);

export default Message;