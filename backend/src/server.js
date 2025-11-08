import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import notesRoutes from './routes/notesRoutes.js';
import { connectDB } from './config/db.js';
import rateLimiter from './middleware/rateLimiter.js';

dotenv.config();
const app = express()
const PORT = process.env.PORT || 5001;
const connectAndStartServer = async() => { 
  await connectDB();  
  app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
}

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',  // Your Vite dev server port
  credentials: true
}));
app.use(rateLimiter);
app.use('/api/notes', notesRoutes);
connectAndStartServer();





