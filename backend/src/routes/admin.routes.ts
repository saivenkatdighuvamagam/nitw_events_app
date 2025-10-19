import { Router } from 'express';
import { authenticateJwt, authorizeRoles } from '@middleware/auth';
import { getOverview } from '@controllers/analytics.controller';

const router = Router();

router.get('/overview', authenticateJwt, authorizeRoles('ADMIN'), getOverview);

export default router;
