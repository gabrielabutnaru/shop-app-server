import express, { Request, Response } from 'express';
import { md5 } from 'js-md5';
import { validate } from '../middleware/validation';
import { userLoginSchema } from '../schemas/userSchemas';
import * as jwt from 'jsonwebtoken';

import { PrismaClient } from '@prisma/client';
import { authenticateToken } from '../middleware/auth.middleware';

const prisma = new PrismaClient();

export const userRouter = express.Router();

userRouter.get(
  '/me',
  authenticateToken,
  async (req: Request, res: Response) => {
    const user = await prisma.users.findUnique({
      where: { username: req.username },
    });
    if (!user) return res.sendStatus(404);
    const { password, ...rest } = user;
    res.send(rest);
  }
);

userRouter.post(
  '/login',
  validate(userLoginSchema),
  async (req: Request, res: Response) => {
    const username = req.body.username;
    const password = req.body.password;
    const user = await prisma.users.findUnique({
      where: { username, password: md5(password) },
    });
    if (!user) {
      res.status(401);
      return res.send({ message: 'Auth data is invalid' });
    }
    res.send({
      jwt: jwt.sign({ username }, process.env.JWT_SECRET as string),
    });
  }
);
