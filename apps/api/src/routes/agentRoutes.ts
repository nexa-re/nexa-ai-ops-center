import { Router } from 'express';
import { agentController } from '../controllers/agentController';

const router = Router();

router.post('/chat', agentController.chat);

export default router;
