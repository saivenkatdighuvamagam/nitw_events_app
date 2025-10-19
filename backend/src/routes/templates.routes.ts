import { Router } from 'express';
import { body } from 'express-validator';
import { authenticateJwt, authorizeRoles } from '@middleware/auth';
import { createTemplate, listTemplates } from '@controllers/templates.controller';

const router = Router();

router.get('/', authenticateJwt, authorizeRoles('ADMIN', 'CLUB_SEC'), listTemplates);
router.post('/', authenticateJwt, authorizeRoles('ADMIN', 'CLUB_SEC'), body('name').isString().notEmpty(), createTemplate);

export default router;
