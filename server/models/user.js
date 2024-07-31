const { getDB } = require("../config/mongo-connection");
const { ObjectId } = require("mongodb");

const collectionName = "Users";
const db = getDB();
const collection = db.collection(collectionName);

module.exports = (() => {
  class User {
    static async getUserByUsername(username) {
      try {
        const result = await collection.find({ username: username }).toArray();
        return result[0];
      } catch (error) {
        throw error;
      }
    }

    static async getUserById(id) {
      try {
        const result = await collection.find({ _id: ObjectId(id) }).toArray();
        return result[0];
      } catch (error) {
        throw error;
      }
    }
  }

  return User;
})();
