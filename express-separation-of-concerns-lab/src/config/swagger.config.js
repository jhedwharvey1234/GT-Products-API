// src/config/swagger.config.js
import swaggerJsdoc from 'swagger-jsdoc';

/**
 * Swagger/OpenAPI Configuration
 * 
 * Why API Documentation?
 * - Enables frontend developers to understand your API without reading code
 * - Interactive testing interface (try endpoints directly in browser)
 * - Industry standard (OpenAPI/Swagger) - works with many tools
 * - Auto-generated from code comments - stays in sync with code
 * - Professional presentation for stakeholders
 * 
 * Why API Versioning?
 * - Allows you to make breaking changes without breaking existing clients
 * - Clients can migrate to new versions at their own pace
 * - Critical for production systems with multiple consumers
 * - Example: /api/v1/posts vs /api/v2/posts
 */

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Blog API',
      version: '1.0.0',
      description: 'A RESTful API for a blog application with authentication, posts, comments, and photo uploads.',
      contact: {
        name: 'API Support',
        email: 'support@example.com',
      },
      license: {
        name: 'ISC',
      },
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3000}`,
        description: 'Development server',
      },
      {
        url: 'https://api.example.com',
        description: 'Production server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter JWT token obtained from /api/v1/auth/login',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'User ID',
              example: 1,
            },
            username: {
              type: 'string',
              description: 'Username',
              example: 'johndoe',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'User email',
              example: 'john@example.com',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Account creation date',
            },
          },
        },
        Post: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'Post ID',
              example: 1,
            },
            title: {
              type: 'string',
              description: 'Post title',
              example: 'My First Post',
            },
            content: {
              type: 'string',
              description: 'Post content',
              example: 'This is the content of my post.',
            },
            userId: {
              type: 'integer',
              description: 'ID of the user who created the post',
              example: 1,
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Post creation date',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Post last update date',
            },
          },
        },
        Comment: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'Comment ID',
              example: 1,
            },
            content: {
              type: 'string',
              description: 'Comment content',
              example: 'Great post!',
            },
            postId: {
              type: 'integer',
              description: 'ID of the post this comment belongs to',
              example: 1,
            },
            userId: {
              type: 'integer',
              description: 'ID of the user who created the comment',
              example: 1,
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Comment creation date',
            },
          },
        },
        ApiResponse: {
          type: 'object',
          properties: {
            statusCode: {
              type: 'integer',
              description: 'HTTP status code',
              example: 200,
            },
            data: {
              type: 'object',
              description: 'Response data',
            },
            message: {
              type: 'string',
              description: 'Response message',
              example: 'Success',
            },
            success: {
              type: 'boolean',
              description: 'Whether the request was successful',
              example: true,
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            statusCode: {
              type: 'integer',
              description: 'HTTP status code',
              example: 400,
            },
            message: {
              type: 'string',
              description: 'Error message',
              example: 'Validation error',
            },
            success: {
              type: 'boolean',
              description: 'Whether the request was successful',
              example: false,
            },
          },
        },
      },
    },
    tags: [
      {
        name: 'Authentication',
        description: 'User authentication endpoints',
      },
      {
        name: 'Users',
        description: 'User management endpoints',
      },
      {
        name: 'Posts',
        description: 'Blog post endpoints',
      },
      {
        name: 'Comments',
        description: 'Comment endpoints',
      },
      {
        name: 'Photos',
        description: 'Photo upload endpoints',
      },
    ],
  },
  apis: ['./src/routes/*.js'], // Path to the API files with JSDoc comments
};

export const swaggerSpec = swaggerJsdoc(options);

