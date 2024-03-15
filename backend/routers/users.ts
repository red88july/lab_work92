import mongoose from "mongoose";
import { Router } from 'express';

import User from "../models/User";
import {UserTypes} from "../types";
export const usersRouter = Router();

usersRouter.post('/',  async (req, res, next) => {
   try {
       const userData: UserTypes = {
           username: req.body.username,
           password: req.body.password,
       };

       const newUser = new User(userData);
       newUser.generatedToken();
       await newUser.save();

       return res.send({message: 'User is correctly registered!', newUser});
   } catch (e) {
       if (e instanceof mongoose.Error.ValidationError) {
           return res.status(422).send(e);
       }
       next(e);
   }
});

usersRouter.post('/sessions', async (req, res ,next) => {
    try {
        const user = await User.findOne({username: req.body.username});

        if (!user) {
            return res.status(422).send({message: `Username not found`});
        }

        const checkPass = await user.checkPassword(req.body.password);

        if (!checkPass) {
            return res.status(422).send({message: `Password is wrong!`});
        }

        user.generatedToken();
        await user.save();

        return res.send({ message: 'Username and password are correct!', user });
    } catch (e) {
        next(e);
    }
});

// usersRouter.delete('/sessions', async (req, res ,next) => {
//     try {
//         const message = {message: 'Success!'};
//
//         const headerValue = req.get('Authorization');
//
//         if(!headerValue) {
//             return res.send(message);
//         }
//
//         const [_bearer, token] = headerValue.split(' ');
//
//         const user = await User.findOne({token});
//
//         if(!user) {
//             return res.send(message);
//         }
//
//         user.generatedToken();
//         await user.save();
//
//         return res.send(message);
//     } catch (e) {
//         next(e);
//     }
// })