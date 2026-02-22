import { Router } from 'express';
import { dealController } from '../controllers/dealController';

const router = Router();

router.get('/', dealController.getAll);
router.get('/:id', dealController.getById);
router.post('/', dealController.create);
router.put('/:id', dealController.update);

export default router;
