// index.js
import dotenv from 'dotenv';
dotenv.config(); // This loads the .env file

import express from 'express';
import userRoutes from "./src/routes/user.routes.js";
import postRoutes from './src/routes/post.routes.js';
import commentRoutes from './src/routes/comment.routes.js';
import authRoutes from './src/routes/auth.routes.js';
import { testConnection } from './src/config/db.js';
import { errorHandler } from './src/middlewares/errorHandler.middleware.js';
import photoRoutes from './src/routes/photo.routes.js';
const app = express();
const port = 3000;

app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Mount routes
app.use('/api/photos', photoRoutes); 
app.use('/api/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);
app.use(errorHandler);
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  testConnection();
});
