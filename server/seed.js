require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Category = require('./models/Category');
const menuSeedData = require('./data/menuSeedData');

async function seed() {
  await connectDB();

  console.log('[Seed] Clearing existing categories...');
  await Category.deleteMany({});

  console.log('[Seed] Inserting menu categories...');
  await Category.insertMany(menuSeedData);

  console.log(`[Seed] Done. Inserted ${menuSeedData.length} categories.`);
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error('[Seed] Failed:', err);
  process.exit(1);
});
