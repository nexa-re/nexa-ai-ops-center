import { Router } from 'express';
import { documentController } from '../controllers/documentController';

const router = Router();

router.get('/', documentController.getAll);
router.get('/:id', documentController.getById);
router.post('/upload', documentController.upload);

export default router;
