require("dotenv").config();
const bcrypt = require("../utils/bcrypt");
const usersData = require("../data/users.json");
const { getDB, connect } = require("../config/mongo-connection");

const seedUsers = async () => {
  try {
    await connect();

    const collectionName = "Users";
    const db = getDB();
    const collection = db.collection(collectionName);

    const hashedUsers = usersData.map((user) => {
      const hashedPassword = bcrypt.hash(user.password);
      return { ...user, password: hashedPassword };
    });

    await collection.insertMany(hashedUsers);
    console.log("Seeded Collection: Users");
    return;
  } catch (error) {
    console.error("Error seeding users:", error);
  }
};

seedUsers();
