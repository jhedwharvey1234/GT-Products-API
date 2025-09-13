import express from 'express';
import postRoutes from './src/routes/post.routes.js';
import commentRoutes from './src/routes/comment.routes.js';
import { testConnection } from './src/config/db.js';

const app = express();
const port = 3000;

app.use(express.json());

// Mount routes
app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  testConnection();
});
