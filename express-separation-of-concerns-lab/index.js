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

// Security middleware imports
import { helmetConfig, corsConfig, globalRateLimiter } from './src/config/security.config.js';

// Swagger imports
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './src/config/swagger.config.js';

const app = express();
const port = process.env.PORT || 3000;

// ============================================
// SECURITY MIDDLEWARE (Apply in order)
// ============================================

// 1. Helmet - Set security HTTP headers
// Must be applied early to protect all routes
app.use(helmetConfig);

// 2. CORS - Enable Cross-Origin Resource Sharing
// Allows frontend applications to access the API
app.use(corsConfig);

// 3. Global Rate Limiting - Protect against DDoS and brute-force
// Applied to all routes
app.use(globalRateLimiter);

// ============================================
// BODY PARSING & STATIC FILES
// ============================================
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// ============================================
// API DOCUMENTATION (Swagger UI)
// ============================================
// Access documentation at: http://localhost:3000/api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Blog API Documentation',
}));

// ============================================
// API VERSIONING - All routes prefixed with /api/v1
// ============================================
// Why versioning?
// - Allows breaking changes without breaking existing clients
// - Clients can migrate to new versions at their own pace
// - Critical for production systems

// Mount routes with version prefix
app.use('/api/v1/photos', photoRoutes); 
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/posts', postRoutes);
app.use('/api/v1/comments', commentRoutes);

// Health check endpoint (useful for monitoring)
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// ============================================
// ERROR HANDLING
// ============================================
app.use(errorHandler);

// ============================================
// SERVER STARTUP
// ============================================
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(`API Documentation available at http://localhost:${port}/api-docs`);
  testConnection();
});
