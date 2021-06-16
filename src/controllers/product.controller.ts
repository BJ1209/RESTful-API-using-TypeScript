import { Request, Response } from 'express';
import Product from '../models/product.model';

export const getAllProducts = async (req: Request, res: Response) => {
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
          productImage: product.productImage,
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
};

export const createProduct = async (req: Request, res: Response) => {
  const { name, price } = req.body;
  const path = req.file.path.replace(/\\/g, '/');
  const productImage = `http://localhost:5000/${path}`;
  try {
    const product = new Product({ name, price, productImage });
    const savedProduct = await product.save();
    const response = {
      message: 'Product Created successfully',
      data: {
        _id: savedProduct._id,
        name: savedProduct.name,
        price: savedProduct.price,
        productImage: savedProduct.productImage,
      },
      request: {
        type: 'GET',
        description: 'Get Details about this product',
        url: `http://localhost:5000/products/${savedProduct._id}`,
      },
    };
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getProductById = async (req: Request, res: Response) => {
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
};

export const updateProduct = async (req: Request, res: Response) => {
  const { productId } = req.params;
  try {
    await Product.updateOne({ _id: productId }, { $set: req.body });
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
};

export const deleteProduct = async (req: Request, res: Response) => {
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
};
