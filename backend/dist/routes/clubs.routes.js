import { Router } from 'express';
import { body, param } from 'express-validator';
import { authenticateJwt, authorizeRoles } from '@middleware/auth';
import { createClub, deleteClub, listClubs } from '@controllers/clubs.controller';
const router = Router();
router.get('/', authenticateJwt, listClubs);
router.post('/', authenticateJwt, authorizeRoles('ADMIN', 'CLUB_SEC'), body('name').isString().notEmpty(), createClub);
router.delete('/:clubId', authenticateJwt, authorizeRoles('ADMIN'), param('clubId').isMongoId(), deleteClub);
export default router;
