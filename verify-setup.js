// Quick Database Verification Script
// Run this with: node verify-setup.js

const { Pool } = require('pg');
require('dotenv').config({ path: './Hope_server/.env' });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function verifySetup() {
  console.log('🔍 Verifying Hope Foundation Database Setup...\n');
  
  try {
    // Test connection
    const client = await pool.connect();
    console.log('✅ Database connection successful');
    
    // Check tables exist
    const tables = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `);
    
    console.log(`✅ Found ${tables.rows.length} tables:`);
    tables.rows.forEach(row => console.log(`   - ${row.table_name}`));
    
    // Check sample data
    const users = await client.query('SELECT COUNT(*) FROM users');
    const programs = await client.query('SELECT COUNT(*) FROM programs');
    
    console.log(`\n📊 Sample Data:`);
    console.log(`   - Users: ${users.rows[0].count}`);
    console.log(`   - Programs: ${programs.rows[0].count}`);
    
    // Test sample login
    const adminUser = await client.query(
      'SELECT email, role FROM users WHERE email = $1',
      ['admin@hopefoundation.org']
    );
    
    if (adminUser.rows.length > 0) {
      console.log(`✅ Sample admin user exists: ${adminUser.rows[0].email}`);
    } else {
      console.log(`❌ Sample admin user not found`);
    }
    
    client.release();
    console.log('\n🎉 Database setup verification complete!');
    console.log('\n📝 Next steps:');
    console.log('   1. Start backend: cd Hope_server && npm run start:dev');
    console.log('   2. Start frontend: cd Hope_client && npm run dev');
    console.log('   3. Visit: http://localhost:3001/test-connection');
    
  } catch (error) {
    console.error('❌ Database verification failed:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('   1. Check PostgreSQL is running');
    console.log('   2. Verify .env file credentials');
    console.log('   3. Ensure hope_platform database exists');
    console.log('   4. Run schema.sql in pgAdmin');
  } finally {
    await pool.end();
  }
}

verifySetup();