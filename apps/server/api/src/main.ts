/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import studentRoutes from './students/students-route';
import cors from 'cors';



// MongoDB connection
mongoose.connect('mongodb+srv://jamster:Soundar@jamsterapp.cuxjnde.mongodb.net/yellow')

const app = express();
app.use(express.json());
app.use(cors());


// Routes
app.use('/api/students', studentRoutes);

app.use('/assets', express.static(path.join(__dirname, 'assets')));


const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/api/students`);
});
server.on('error', console.error);
