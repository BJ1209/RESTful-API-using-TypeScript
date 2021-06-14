import { Router, Request, Response } from 'express';

const router: Router = Router();

// get all products
router.get('/', (req: Request, res: Response) => {
  res.send('asd');
});

// get specific product
router.get('/:orderId', (req: Request, res: Response) => {
  const { orderId } = req.params;
});

export default router;
