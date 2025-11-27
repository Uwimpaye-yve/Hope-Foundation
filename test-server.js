// Simple test to check if backend is running
const fetch = require('node-fetch');

async function testServer() {
  try {
    console.log('Testing backend server...');
    const response = await fetch('http://localhost:3000/api/programs');
    console.log('Status:', response.status);
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Backend is working! Programs:', data.length);
    } else {
      console.log('❌ Backend returned error:', response.status, response.statusText);
    }
  } catch (error) {
    console.log('❌ Cannot connect to backend:', error.message);
    console.log('\n🔧 To fix this:');
    console.log('1. Open terminal in Hope_server folder');
    console.log('2. Run: npm run start:dev');
    console.log('3. Wait for "Application is running on: http://[::1]:3000"');
  }
}

testServer();