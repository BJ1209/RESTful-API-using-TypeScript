import { Schema, model, Document } from 'mongoose';

interface UserDocument extends Document {
  email: string;
  password: string;
}

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match:
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
  },
  password: { type: String, required: true },
});

const User = model<UserDocument>('User', UserSchema);

export default User;
