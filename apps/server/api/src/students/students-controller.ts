// controllers/studentController.ts
import { Request, Response } from 'express';
import Student from '../students/students-models';

class StudentController {
    public async createStudent(req: Request, res: Response): Promise<void> {
        try {
            const student = new Student(req.body);
            await student.save();
            res.send(student);
        } catch (err) {
            res.status(400).send(err);
        }
    }

    public async getAllStudents(req: Request, res: Response): Promise<void> {
        try {
            const students = await Student.find({ archived: false });
            res.send(students);
        } catch (err) {
            res.status(500).send(err);
        }
    }

    public async updateStudent(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const student = await Student.findByIdAndUpdate(id, req.body, { new: true });
            res.send(student);
        } catch (err) {
            res.status(400).send(err);
        }
    }

    public async deleteStudent(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const student = await Student.findByIdAndUpdate(id, { archived: true }, { new: true });
            res.send(student);
        } catch (err) {
            res.status(400).send(err);
        }
    }
}

export default new StudentController();
