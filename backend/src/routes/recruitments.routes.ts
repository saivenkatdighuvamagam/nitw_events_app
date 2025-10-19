import { Router } from 'express';
import { body, param } from 'express-validator';
import multer from 'multer';
import { authenticateJwt, authorizeRoles } from '@middleware/auth';
import { deleteRecruitment, getAllRecruitments, getRecruitment, postRecruitment, updateRecruitment } from '@controllers/recruitments.controller';

const router = Router();
const upload = multer();

router.get('/getAllRecruitments', authenticateJwt, getAllRecruitments);
router.get('/getRecruitment/:id', authenticateJwt, param('id').isMongoId(), getRecruitment);

router.post('/postRecruitment',
  authenticateJwt,
  authorizeRoles('ADMIN', 'CLUB_SEC'),
  upload.single('image'),
  body('title').isString().notEmpty(),
  body('description').isString().notEmpty(),
  body('date').isString().notEmpty(),
  body('time').isString().notEmpty(),
  body('venue').isString().notEmpty(),
  body('club').isString().notEmpty(),
  postRecruitment
);

router.put('/updateRecruitment/:id',
  authenticateJwt,
  authorizeRoles('ADMIN', 'CLUB_SEC'),
  upload.single('image'),
  param('id').isMongoId(),
  updateRecruitment
);

router.delete('/deleteRecruitment/:id',
  authenticateJwt,
  authorizeRoles('ADMIN', 'CLUB_SEC'),
  param('id').isMongoId(),
  deleteRecruitment
);

export default router;
