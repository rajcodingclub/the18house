const mongoose = require('mongoose');

async function connectDB() {
  const uri = process.env.MONGO_URI || 'mongodb://rajawantyadav436_db_user:Raj%408601@ac-yt1uzli-shard-00-00.tzfdold.mongodb.net:27017,ac-yt1uzli-shard-00-01.tzfdold.mongodb.net:27017,ac-yt1uzli-shard-00-02.tzfdold.mongodb.net:27017/the18house?ssl=true&replicaSet=atlas-ft1iuf-shard-0&authSource=admin&appName=the18house';

  try {
    await mongoose.connect(uri);
    console.log(`[MongoDB] Connected -> ${mongoose.connection.host}/${mongoose.connection.name}`);
  } catch (err) {
    console.error('[MongoDB] Connection error:', err.message);
    process.exit(1);
  }
}

module.exports = connectDB;
