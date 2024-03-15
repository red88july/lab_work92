import { Request, Response, NextFunction } from "express";
import { HydratedDocument } from "mongoose";

import User from "../models/User";
import { UserDataExtendsSchema } from "../types";

export interface RequestUser extends Request {
    user?: HydratedDocument<UserDataExtendsSchema>
}

const auth = async (req: RequestUser, res: Response, next: NextFunction) => {

    const headerValue = req.get( 'Authorization' );

    if (!headerValue) {
        return res.status(401).send({error: `No authorization header value!`})
    }

    const [_bearer, token] = headerValue.split(' ');

    const user = await User.findOne({token});

    if (!user) {
        return res.status(401).send({error: `Wrong token!`});
    }

    req.user = user;
    next();

}

export default auth;