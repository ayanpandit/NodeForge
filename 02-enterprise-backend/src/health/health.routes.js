import { Router } from 'express';
import { getLiveness, getReadiness, getHealth } from './health.controller.js';

const router = Router();

router.get('/live', getLiveness);
router.get('/ready', getReadiness);
router.get('/status', getHealth);

export default router;
