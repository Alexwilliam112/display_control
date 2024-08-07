const { MongoClient } = require("mongodb");
const uri = process.env.MONGODB_CONN_STRING;
const client = new MongoClient(uri);

const DB_NAME = "pdrvmap24";
let database;

async function connect() {
  try {
    await client.connect();
    console.log("MongoDB Connected..");
    database = client.db(DB_NAME);
    return database;
  } catch (error) {
    console.log("MongoDB Connection Error");
    await client.close();
    throw error;
  }
}

function getDB() {
  if (!database) {
    throw new Error("Database not connected");
  }
  return database;
}

module.exports = { connect, getDB };
