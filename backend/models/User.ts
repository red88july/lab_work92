import bcrypt from 'bcrypt';
import {Schema, model, HydratedDocument} from "mongoose";
import { randomUUID } from "crypto";

import {UserDataExtendsSchema, UserMethods, UserModel} from "../types";

const SALT_WORK = 10;

const UserSchema = new Schema<UserDataExtendsSchema, UserMethods, UserModel>({
    username: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: async function (
                this: HydratedDocument<UserDataExtendsSchema>,
                username: string):Promise<boolean> {
                if(!this.isModified('username')) return true;

                const user: HydratedDocument<UserDataExtendsSchema> | null = await User.findOne({
                    username: username,
                });

                return !user;
            },
            message: 'This User is already registered!'
        }
    },

    password: {
        type: String,
        required: true,
    },

    token: {
        type: String,
        required: true,
    },

}, { versionKey: false });

UserSchema.methods.generatedToken = function () {
    this.token = randomUUID();
}

UserSchema.methods.checkPassword = function (password: string) {
    return bcrypt.compare(password, this.password);
}

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(SALT_WORK);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.set('toJSON', {
    transform: (_doc, ret, _options) => {
        delete ret.password;
        return ret;
    }
})

const User = model<UserDataExtendsSchema, UserModel>('User', UserSchema);

export default User;