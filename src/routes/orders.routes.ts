import { Router } from 'express';
import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getOrderById,
} from '../controllers/order.controller';
import checkAuth from '../middleware/checkAuth';

const router: Router = Router();

// get all orders
router.get('/', checkAuth, getAllOrders);

// get specific product
router.get('/:orderId', checkAuth, getOrderById);

// create a order
router.post('/', checkAuth, createOrder);

// delete a order
router.delete('/:orderId', checkAuth, deleteOrder);
export default router;
