import express from 'express';
import {
  listProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  publishProduct,
  withdrawProduct,
} from '../controllers/productController';

const router = express.Router();

router.get('/', listProducts);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);
router.patch('/:id/publish', publishProduct);
router.patch('/:id/withdraw', withdrawProduct);

export default router;
