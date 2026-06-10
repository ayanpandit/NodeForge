import { Router } from 'express';
import { getLiveness, getReadiness, getHealth, getVersion } from './health.controller.js';

const router = Router();

router.get('/', getHealth);
router.get('/live', getLiveness);
router.get('/ready', getReadiness);
router.get('/status', getHealth);
router.get('/version', getVersion);

export default router;
