import { Router, Request } from 'express';
import multer from 'multer';
import checkAuth from '../middleware/checkAuth';
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from '../controllers/product.controller';

const storage = multer.diskStorage({
  // where the file will be saved
  destination: function (req: Request, file, callback) {
    callback(null, './uploads');
  },

  // how the name of the file will save
  // in windows, we can't specify special characters in the filename
  // only use character/numbers/hyphen or replace : with valid characters
  filename: function (req: Request, file, callback) {
    callback(null, `${new Date().toISOString().replace(/:/g, '-')}-${file.originalname}`);
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: function (req: Request, file, callback) {
    if (
      file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/png'
    ) {
      //Accept File
      callback(null, true);
    }
    // Reject File
    callback(null, false);
  },
});

const router: Router = Router();

// get all products
router.get('/', getAllProducts);

// Create a post
router.post('/', checkAuth, upload.single('productImage'), createProduct);

// get specific product
router.get('/:productId', getProductById);

// update a product
router.patch('/:productId', checkAuth, updateProduct);

// delete a product
router.delete('/:productId', checkAuth, deleteProduct);

export default router;
