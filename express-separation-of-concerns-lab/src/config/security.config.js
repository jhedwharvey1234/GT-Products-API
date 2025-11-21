// src/config/security.config.js
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';

/**
 * Helmet Configuration
 * Sets various HTTP headers to help protect your app from well-known web vulnerabilities
 * 
 * Why helmet?
 * - Automatically sets security headers (X-Content-Type-Options, X-Frame-Options, etc.)
 * - Prevents clickjacking, XSS attacks, and other common vulnerabilities
 * - Industry standard for Express security
 */
export const helmetConfig = helmet({
  // Content Security Policy - controls which resources can be loaded
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"], // Allow inline styles for Swagger UI
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"], // Allow inline scripts for Swagger UI
      imgSrc: ["'self'", "data:", "https:"], // Allow images from self, data URIs, and HTTPS
    },
  },
  // Cross-Origin Embedder Policy
  crossOriginEmbedderPolicy: false, // Disabled for Swagger UI compatibility
});

/**
 * CORS Configuration
 * Cross-Origin Resource Sharing - controls which origins can access your API
 * 
 * Why CORS?
 * - Browsers enforce same-origin policy by default
 * - Your frontend (e.g., React app on localhost:3000) needs to call your API (localhost:3000)
 * - Without CORS, browser blocks these requests
 * - In production, specify your actual frontend domain
 */
export const corsConfig = cors({
  origin: process.env.FRONTEND_ORIGIN || 'http://localhost:3000', // Allow requests from this origin
  credentials: true, // Allow cookies/auth headers
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});

/**
 * Global Rate Limiter
 * Protects against brute-force and DDoS attacks by limiting requests per IP
 * 
 * Why rate limiting?
 * - Prevents abuse: brute-force attacks, scraping, DDoS
 * - Protects server resources from being exhausted
 * - Industry standard practice for production APIs
 */
export const globalRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

/**
 * Strict Rate Limiter for Auth Routes
 * More restrictive limits on login/register to prevent brute-force attacks
 * 
 * Why stricter limits on auth?
 * - Login/register are prime targets for brute-force attacks
 * - Slower rate = harder to guess passwords
 * - Protects user accounts from being compromised
 */
export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 login/register attempts per windowMs
  message: 'Too many authentication attempts, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true, // Don't count successful requests
});

