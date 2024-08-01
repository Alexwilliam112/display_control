const { getDB } = require("../config/mongo-connection");
const { ObjectId } = require("mongodb");

const getCollection = async () => {
  const collection = await getDB().collection("Users");
  return collection;
};

module.exports = (() => {
  class User {
    static async getUserByUsername(username) {
      try {
        const collection = await getCollection()
        const result = await collection.find({ username: username }).toArray();
        return result[0];
      } catch (error) {
        throw error;
      }
    }

    static async getUserById(id) {
      try {
        const collection = await getCollection()
        const result = await collection.find({ _id: new ObjectId(id) }).toArray();
        return result[0];
      } catch (error) {
        throw error;
      }
    }
  }

  return User;
})();
