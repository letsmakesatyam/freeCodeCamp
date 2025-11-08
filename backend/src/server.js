import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import notesRoutes from './routes/notesRoutes.js';
import { connectDB } from './config/db.js';
import rateLimiter from './middleware/rateLimiter.js';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

// Proper __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const connectAndStartServer = async() => { 
  await connectDB();  
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

app.use(express.json());

// CORS configuration
if(process.env.NODE_ENV === 'production'){
  app.use(cors({
    origin: 'https://freecodecamp-83fi.onrender.com',
    credentials: true
  }));
} else {
  app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
  }));
}

// API routes
app.use(rateLimiter);
app.use('/api/notes', notesRoutes);

// Serve frontend in production
if(process.env.NODE_ENV === 'production'){
  // From backend/src/server.js, go up one level to backend, then up to root, then to frontend/dist
  const frontendPath = path.join(process.cwd(), '..', 'frontend', 'dist');
  
  console.log('=== Path Debug Info ===');
  console.log('process.cwd():', process.cwd());
  console.log('__dirname:', __dirname);
  console.log('frontendPath:', frontendPath);
  console.log('index.html exists?', fs.existsSync(path.join(frontendPath, 'index.html')));
  
  if (fs.existsSync(frontendPath)) {
    console.log('✅ Files in dist:', fs.readdirSync(frontendPath));
  } else {
    console.error('❌ Frontend dist folder not found at:', frontendPath);
  }
  
  // Serve static files
  app.use(express.static(frontendPath));
  
  // Serve index.html for all non-API routes
  app.get(/^\/(?!api).*/, (req, res) => {
    const indexPath = path.join(frontendPath, 'index.html');
    res.sendFile(indexPath, (err) => {
      if (err) {
        console.error('Error sending file:', err);
        res.status(500).send('Error loading page');
      }
    });
  });
}

connectAndStartServer();