import { Router, Request, Response } from 'express';
import Product from '../models/product.model';

const router: Router = Router();

// get all products
router.get('/', async (req: Request, res: Response) => {
  try {
    const products = await Product.find({}).select({ __v: 0 });

    if (products.length < 1) {
      return res.status(200).json({ message: ' No products found!! ', data: products });
    }

    const response = {
      count: products.length,
      data: products.map((product) => {
        return {
          id: product._id,
          name: product.name,
          price: product.price,
          request: {
            type: 'GET',
            url: `http://localhost:5000/products/${product._id}`,
          },
        };
      }),
    };

    res.status(200).json({ data: response });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Create a post
router.post('/', async (req: Request, res: Response) => {
  const { name, price } = req.body;
  try {
    const product = new Product({ name, price });
    const savedPost = await product.save();
    const response = {
      message: 'Post Created',
      data: { _id: savedPost._id, name: savedPost.name, price: savedPost.price },
      request: {
        type: 'GET',
        description: 'Get Details about this product',
        url: `http://localhost:5000/products/${savedPost._id}`,
      },
    };
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// get specific product
router.get('/:productId', async (req: Request, res: Response) => {
  const { productId } = req.params;
  try {
    const product = await Product.findById(productId).select({ __v: 0 });
    if (!product) {
      return res
        .status(200)
        .json({ message: `Couldn't find the product with the provided id`, data: {} });
    }
    const response = {
      product,
      request: {
        type: 'GET',
        desctiption: 'get all products',
        url: 'http://localhost:5000/products/',
      },
    };
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// update a product
router.patch('/:productId', async (req: Request, res: Response) => {
  const { productId } = req.params;
  try {
    const updatedProduct = await Product.updateOne({ _id: productId }, { $set: req.body });
    const response = {
      message: 'product Updated',
      request: {
        type: 'GET',
        description: 'get product details',
        url: `http://localhost:5000/products/${productId}`,
      },
    };
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// delete a product
router.delete('/:productId', async (req: Request, res: Response) => {
  const { productId } = req.params;
  try {
    const deletedProduct = await Product.deleteOne({ _id: productId });
    if (!deletedProduct) {
      return res.status(200).json({ message: "coudn't find the product", data: {} });
    }
    res.status(200).json({ message: 'Product Deleted' });
  } catch (error) {
    res.status(500).json({ messge: 'Server Error', error });
  }
});

export default router;
