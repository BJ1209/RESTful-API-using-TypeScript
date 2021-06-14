import mongoose, { Schema, model, RefType } from 'mongoose';

interface OrderDocument {
  productId: mongoose.Schema.Types.ObjectId;
  quantity: number;
}

const OrderSchema = new Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
});

const Order = model<OrderDocument>('Order', OrderSchema);

export default Order;
