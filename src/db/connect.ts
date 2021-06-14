import mongoose from 'mongoose';

const connect = () => {
  const dbUri = process.env.MONGO_CONNECTION_URI as string;
  mongoose
    .connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('DB Connected'))
    .catch((err) => console.error(err));
};

export default connect;
