#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting Hope Foundation Production Deployment...\n');

// Production readiness checks
function checkProductionReadiness() {
  console.log('🔍 Checking production readiness...');
  
  const checks = [
    {
      name: 'Backend .env.production',
      path: path.join(__dirname, 'Hope_server', '.env.production'),
      required: true
    },
    {
      name: 'Frontend .env.production', 
      path: path.join(__dirname, 'Hope_client', '.env.production'),
      required: true
    },
    {
      name: 'Database schema',
      path: path.join(__dirname, 'Hope_server', 'database', 'schema.sql'),
      required: true
    }
  ];
  
  let allPassed = true;
  
  checks.forEach(check => {
    if (fs.existsSync(check.path)) {
      console.log(`✅ ${check.name}`);
    } else {
      console.log(`❌ ${check.name} - Missing`);
      if (check.required) allPassed = false;
    }
  });
  
  return allPassed;
}

// Security checks
function checkSecurity() {
  console.log('\n🔒 Running security checks...');
  
  const backendEnv = path.join(__dirname, 'Hope_server', '.env.production');
  if (fs.existsSync(backendEnv)) {
    const envContent = fs.readFileSync(backendEnv, 'utf8');
    
    if (envContent.includes('default-secret-key') || envContent.includes('change-this')) {
      console.log('❌ Default JWT secret detected - Update JWT_SECRET');
      return false;
    }
    
    if (envContent.includes('localhost')) {
      console.log('⚠️  Localhost URLs detected in production config');
    }
    
    console.log('✅ Security checks passed');
  }
  
  return true;
}

try {
  // Run checks
  if (!checkProductionReadiness()) {
    throw new Error('Production readiness checks failed');
  }
  
  if (!checkSecurity()) {
    throw new Error('Security checks failed');
  }
  
  // Install dependencies
  console.log('\n📦 Installing dependencies...');
  execSync('npm install --production', { cwd: 'Hope_server', stdio: 'inherit' });
  execSync('npm install', { cwd: 'Hope_client', stdio: 'inherit' });
  
  // Build applications
  console.log('\n🔨 Building applications...');
  execSync('npm run build', { cwd: 'Hope_server', stdio: 'inherit' });
  execSync('npm run build', { cwd: 'Hope_client', stdio: 'inherit' });
  
  // Create deployment package
  console.log('\n📦 Creating deployment package...');
  execSync('tar -czf hope-foundation-production.tar.gz Hope_server/dist Hope_server/package.json Hope_server/.env.production Hope_client/.next Hope_client/package.json Hope_client/.env.production', { stdio: 'inherit' });
  
  console.log('\n🎉 Production build complete!');
  console.log('\n📋 Deployment checklist:');
  console.log('✅ Applications built successfully');
  console.log('✅ Production package created: hope-foundation-production.tar.gz');
  console.log('\n🚀 Next steps:');
  console.log('1. Upload package to production server');
  console.log('2. Set up production database');
  console.log('3. Run database migrations');
  console.log('4. Configure SSL certificates');
  console.log('5. Start production services');
  
} catch (error) {
  console.error('❌ Production build failed:', error.message);
  process.exit(1);
}