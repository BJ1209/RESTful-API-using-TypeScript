import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import connect from './db/connect';
import cors from 'cors';
import productRoutes from './routes/products.routes';
import orderRoutes from './routes/orders.routes';
import morgan from 'morgan';
import userRoutes from './routes/user.routes';

dotenv.config();
const PORT = process.env.PORT || 5000;
const app: Application = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));
// serving the images at /uploads route
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/user', userRoutes);

app.all('*', (req: Request, res: Response) => {
  res.status(404).json({ message: 'Not Found' });
});

// listen
app.listen(PORT, () => {
  console.log('listening at http://localhost:5000/');
  connect();
});
