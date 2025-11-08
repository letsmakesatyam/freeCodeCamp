import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import notesRoutes from './routes/notesRoutes.js';
import { connectDB } from './config/db.js';
import rateLimiter from './middleware/rateLimiter.js';
import path from 'path';
dotenv.config();
const app = express()
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();
const connectAndStartServer = async() => { 
  await connectDB();  
  app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
}

app.use(express.json());
if(process.env.NODE_ENV !== 'production'){
  app.use(cors({
  origin: 'http://localhost:5173',  // Your Vite dev server port
  credentials: true
}));
}

app.use(rateLimiter);
app.use('/api/notes', notesRoutes);
if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname, 'frontend', 'dist')));app.use(express.static(path.join(__dirname, '../frontend/dist')));
 app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
  });
}

connectAndStartServer();





