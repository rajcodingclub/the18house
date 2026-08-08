// =========================================================
// Creates (or updates) the admin login used by the dashboard.
// Reads ADMIN_SEED_EMAIL / ADMIN_SEED_PASSWORD / ADMIN_SEED_NAME
// from server/.env — set those first, then run:
//
//   npm run seed:admin
//
// Safe to re-run: if the email already exists, its password/name
// are updated instead of creating a duplicate.
// =========================================================
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Admin = require('./models/Admin');

async function seedAdmin() {
  const email = (process.env.ADMIN_SEED_EMAIL || '').toLowerCase().trim();
  const password = process.env.ADMIN_SEED_PASSWORD;
  const name = process.env.ADMIN_SEED_NAME || 'Admin';

  if (!email || !password) {
    console.error('[Seed Admin] Set ADMIN_SEED_EMAIL and ADMIN_SEED_PASSWORD in server/.env first.');
    process.exit(1);
  }

  await connectDB();

  let admin = await Admin.findOne({ email }).select('+password');

  if (admin) {
    console.log(`[Seed Admin] Admin "${email}" already exists — updating password/name.`);
    admin.name = name;
    admin.password = password; // pre('save') hook re-hashes this
    await admin.save();
  } else {
    admin = await Admin.create({ name, email, password });
    console.log(`[Seed Admin] Created admin "${email}".`);
  }

  console.log('[Seed Admin] Done. You can now log in at /admin/login with:');
  console.log(`  email:    ${email}`);
  console.log('  password: (the value of ADMIN_SEED_PASSWORD in your .env)');

  await mongoose.disconnect();
  process.exit(0);
}

seedAdmin().catch((err) => {
  console.error('[Seed Admin] Failed:', err);
  process.exit(1);
});
