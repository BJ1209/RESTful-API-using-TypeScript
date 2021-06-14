import { Router, Request, Response } from 'express';
import Product from '../models/product.model';

const router: Router = Router();

// get all products
router.get('/', async (req: Request, res: Response) => {
  try {
    const products = await Product.find({});
    if (products.length < 1) {
      return res.status(200).json({ message: ' No products!!!', data: products });
    }
    res.status(200).json({ data: products });
  } catch (error) {}
});

// Create a post
router.post('/', async (req: Request, res: Response) => {
  const { name, price } = req.body;
  console.log(name, price);
  try {
    const product = new Product({ name, price });
    const savedPost = await product.save();
    res.status(201).json({ message: 'Post created', data: savedPost });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// get specific product
// router.get('/:productId', (req: Request, res: Response) => {
//   const { productId } = req.params;
// });

export default router;
