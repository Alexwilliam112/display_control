require("dotenv").config();
const bcrypt = require("../utils/bcrypt");
const usersData = require("../data/articles.json");
const { getDB, connect } = require("../config/mongo-connection");

const seedArticles = async () => {
  try {
    await connect();

    const collectionName = "Articles";
    const db = getDB();
    const collection = db.collection(collectionName);

    const hashedUsers = usersData.map((user) => {
      const hashedPassword = bcrypt.hash(user.password);
      return { ...user, password: hashedPassword };
    });

    await collection.insertMany(hashedUsers);
    console.log("Seeded Collection: Articles");
    return;
  } catch (error) {
    console.error("Error seeding Articles:", error);
  }
};

seedArticles();
