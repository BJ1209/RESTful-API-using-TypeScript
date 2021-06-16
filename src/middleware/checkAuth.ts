import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export default async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1]!;
  try {
    const decode = jwt.verify(token, process.env.JWT_KEY as string);
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Auth Failed' });
  }
};
