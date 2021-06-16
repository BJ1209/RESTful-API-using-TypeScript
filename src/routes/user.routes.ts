import { Router } from 'express';
import { deleteUser, login, signup } from '../controllers/user.controller';
const router: Router = Router();

// create a user
router.post('/signup', signup);

// login
router.post('/login', login);

// delete a user
router.delete('/:userId', deleteUser);
export default router;
