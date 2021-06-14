import { Schema, model, Document } from 'mongoose';

interface ProductDocument extends Document {
  name: string;
  price: number;
  productImage: string;
}

const ProductSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  productImage: { type: String, required: true },
});

const Product = model<ProductDocument>('Product', ProductSchema);

export default Product;
