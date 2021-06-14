import { Schema, model, Document } from 'mongoose';

interface ProductDocument extends Document {
  name: string;
  price: number;
}

const ProductSchema = new Schema({
  name: String,
  price: Number,
});

const Product = model<ProductDocument>('Product', ProductSchema);

export default Product;
