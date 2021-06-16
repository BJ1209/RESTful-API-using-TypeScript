import { Router, Request, Response } from 'express';
const router: Router = Router();
import User from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// create a user
router.post('/signup', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.find({ email });

    if (user.length >= 1) {
      return res.status(409).json({ message: 'user already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: 'user created' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
});

// login
router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // check if user is present in db
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Auth Failed' });
    }

    // compare the passwords and authorize with a token
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        return res.status(401).json({ message: 'Auth Failed' });
      }

      // The result will be true if passwords match otherwise false
      if (result) {
        const token = jwt.sign(
          { email: user?.email, id: user?._id },
          process.env.JWT_KEY as string,
          {
            expiresIn: '1h',
          }
        );
        return res.status(200).json({ message: 'successfully authenticated', token });
      }
      return res.status(401).json({ message: 'Auth Failed' });
    });
  } catch (error) {
    res.status(500).json({ message: 'server error', error });
  }
});

// delete a user
router.delete('/:userId', async (req: Request, res: Response) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.userId);
    if (!deletedUser) {
      return res.status(200).json({ message: "User doesn't exist" });
    }
    res.status(200).json({ message: 'User Deleted' });
  } catch (error) {
    res.status(500).json({ message: 'server error', error });
  }
});
export default router;
