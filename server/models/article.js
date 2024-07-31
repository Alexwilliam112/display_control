const { getDB } = require("../config/mongo-connection");
const { ObjectId } = require("mongodb");

const collectionName = "Articles";
const db = getDB();
const collection = db.collection(collectionName);

module.exports = (() => {
  class Article {
    static async getArticles() {
      try {
        const result = await collection.find().toArray();
        return result;
      } catch (error) {
        throw error;
      }
    }
  }

  return Article;
})();
