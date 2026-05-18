const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://ffernotech_db_user:Oir1szTwDdYuJ3Mu@cluster0.wfjvsd5.mongodb.net/fernotech";

async function run() {
  try {
    const client = new MongoClient(uri);
    await client.connect();
    console.log("Connected successfully to MongoDB");
    await client.close();
  } catch (err) {
    console.error("Connection error:", err);
  }
}

run();
