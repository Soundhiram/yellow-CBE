// models/studentModel.ts
import mongoose, { Document, Schema } from 'mongoose';

interface IStudent extends Document {
    name: string;
    email: string;
    phone: string;
    enrollNumber: string;
    dateOfAdmission: Date;
    archived: boolean;
}

const studentSchema: Schema = new Schema({
    name: String,
    email: String,
    phone: String,
    enrollNumber: String,
    dateOfAdmission: Date,
    archived: { type: Boolean, default: false }
});

export default mongoose.model<IStudent>('Student', studentSchema);
