import mongoose, { Document, Schema } from 'mongoose';

interface IStudent extends Document {
    name: string;
    email: string;
    phone: string;
    enrollNumber: string;
    dateOfAdmission:string;
    archived: boolean;
}

const studentSchema: Schema = new Schema({
    name: String,
    email: String,
    phone: String,
    enrollNumber: String,
    dateOfAdmission: String,
    archived: { type: Boolean, default: false }
});

export default mongoose.model<IStudent>('Student', studentSchema);
