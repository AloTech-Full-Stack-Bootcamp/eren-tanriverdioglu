import express from 'express';
import {
  createCategory,
  deleteCategory
} from '../controllers/categoryController.js';
import roleMiddleware from '../middlewares/roleMiddleware.js';

const router = express.Router();

router.route('/').post(roleMiddleware(['admin']), createCategory);
router.route('/:id').delete(roleMiddleware(['admin']), deleteCategory);

export default router
