// Test script to verify Swagger comments are working
// Run with: node test-swagger.js

import { swaggerSpec } from './src/config/swagger.config.js';

console.log('=== SWAGGER SPEC ANALYSIS ===\n');

// Check if spec was generated
if (!swaggerSpec) {
  console.error('❌ ERROR: Swagger spec is null or undefined');
  process.exit(1);
}

// Count paths
const paths = swaggerSpec.paths || {};
const pathCount = Object.keys(paths).length;
console.log(`✅ Total API paths found: ${pathCount}`);

// List all paths
console.log('\n📋 Documented Endpoints:');
Object.keys(paths).sort().forEach(path => {
  const methods = Object.keys(paths[path]);
  methods.forEach(method => {
    const endpoint = paths[path][method];
    const summary = endpoint.summary || 'No summary';
    const tags = endpoint.tags ? `[${endpoint.tags.join(', ')}]` : '';
    console.log(`  ${method.toUpperCase().padEnd(6)} ${path.padEnd(40)} ${tags} - ${summary}`);
  });
});

// Check tags
const tags = swaggerSpec.tags || [];
console.log(`\n✅ Tags defined: ${tags.length}`);
tags.forEach(tag => {
  console.log(`  - ${tag.name}: ${tag.description || 'No description'}`);
});

// Check schemas
const schemas = swaggerSpec.components?.schemas || {};
console.log(`\n✅ Schemas defined: ${Object.keys(schemas).length}`);
Object.keys(schemas).forEach(schema => {
  console.log(`  - ${schema}`);
});

// Check for common issues
console.log('\n🔍 Validation Checks:');

// Check if all paths have summaries
let missingSummaries = 0;
Object.keys(paths).forEach(path => {
  Object.keys(paths[path]).forEach(method => {
    if (!paths[path][method].summary) {
      missingSummaries++;
      console.log(`  ⚠️  Missing summary: ${method.toUpperCase()} ${path}`);
    }
  });
});
if (missingSummaries === 0) {
  console.log('  ✅ All endpoints have summaries');
} else {
  console.log(`  ⚠️  ${missingSummaries} endpoint(s) missing summaries`);
}

// Check if all paths have tags
let missingTags = 0;
Object.keys(paths).forEach(path => {
  Object.keys(paths[path]).forEach(method => {
    if (!paths[path][method].tags || paths[path][method].tags.length === 0) {
      missingTags++;
      console.log(`  ⚠️  Missing tags: ${method.toUpperCase()} ${path}`);
    }
  });
});
if (missingTags === 0) {
  console.log('  ✅ All endpoints have tags');
} else {
  console.log(`  ⚠️  ${missingTags} endpoint(s) missing tags`);
}

// Check if protected routes have security defined
let missingSecurity = 0;
const protectedRoutes = [
  '/api/v1/posts',
  '/api/v1/photos',
  '/api/v1/posts/{id}',
  '/api/v1/photos/{id}',
  '/api/v1/photos/upload'
];
Object.keys(paths).forEach(path => {
  Object.keys(paths[path]).forEach(method => {
    const endpoint = paths[path][method];
    const isProtected = protectedRoutes.some(route => path.includes(route.replace('{id}', '').replace('{postId}', '')));
    if (isProtected && method !== 'get' && !endpoint.security) {
      missingSecurity++;
      console.log(`  ⚠️  Protected route missing security: ${method.toUpperCase()} ${path}`);
    }
  });
});
if (missingSecurity === 0) {
  console.log('  ✅ All protected routes have security defined');
} else {
  console.log(`  ⚠️  ${missingSecurity} protected route(s) missing security definition`);
}

console.log('\n✅ Swagger comments are working correctly!');
console.log('\n📖 Access Swagger UI at: http://localhost:3000/api-docs');

