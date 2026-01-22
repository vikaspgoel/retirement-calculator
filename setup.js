const fs = require('fs');
const crypto = require('crypto');

// Generate a random secret for NextAuth
const secret = crypto.randomBytes(32).toString('base64');

const envContent = `# NextAuth Configuration
# Auto-generated secret - keep this secure!
NEXTAUTH_SECRET=${secret}
NEXTAUTH_URL=http://localhost:3000
`;

// Check if .env.local already exists
if (fs.existsSync('.env.local')) {
  console.log('⚠️  .env.local already exists. Skipping creation.');
  console.log('   If you want to regenerate, delete .env.local and run this script again.');
} else {
  fs.writeFileSync('.env.local', envContent);
  console.log('✅ Created .env.local with auto-generated NEXTAUTH_SECRET');
  console.log('   Keep this file secure and never commit it to version control!');
}

console.log('\n📦 Next steps:');
console.log('   1. Run: npm install');
console.log('   2. Run: npm run dev');
console.log('   3. Open: http://localhost:3000\n');
