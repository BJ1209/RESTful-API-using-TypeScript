import { Request, Response } from 'express';
import Order from '../models/order.model';
import Product from '../models/product.model';

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find({}).select({ __v: 0 });
    if (orders.length < 1) {
      return res.status(200).json({ message: 'No Orders Found!!' });
    }
    const response = {
      count: orders.length,
      orders: orders.map((order) => {
        return {
          _id: order._id,
          productId: order.productId,
          quantity: order.quantity,
          request: {
            type: 'GET',
            description: 'get order details',
            url: `http://localhost:5000/orders/${order._id}`,
          },
        };
      }),
    };
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  const { orderId } = req.params;
  try {
    const order = await Order.findById(orderId).select({ __v: 0 });
    if (!order) {
      return res.status(200).json({ message: 'no order found for this particular Id', order: {} });
    }
    const response = {
      order,
      request: {
        type: 'GET',
        description: 'get all orders',
        url: 'http://localhost:5000/orders',
      },
    };
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const createOrder = async (req: Request, res: Response) => {
  const { quantity, productId } = req.body;
  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(200).json({ message: 'product not found' });
    }

    const order = new Order({
      quantity,
      productId,
    });

    const newOrder = await order.save();
    const response = {
      message: 'order created',
      data: {
        _id: newOrder._id,
        productId: newOrder.productId,
        quantity: newOrder.quantity,
      },
      request: {
        type: 'GET',
        description: 'Get order details',
        url: `http://localhost:5000/orders/${newOrder._id}`,
      },
    };
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const deleteOrder = async (req: Request, res: Response) => {
  const { orderId } = req.params;
  try {
    const deletedOrder = await Order.findByIdAndDelete(orderId);
    if (!deletedOrder) {
      res.status(200).json({ message: "couldn't found the order" });
    }
    res.status(200).json({ message: 'Order deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
