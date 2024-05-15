// routes/studentRoutes.ts
import express from 'express';
import studentController from '../students/students-controller';

const router = express.Router();

router.post('/', studentController.createStudent);
router.get('/', studentController.getAllStudents);
router.put('/:id', studentController.updateStudent);
router.delete('/:id', studentController.deleteStudent);

export default router;
