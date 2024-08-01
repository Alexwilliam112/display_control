const { getDB } = require("../config/mongo-connection");

const getCollection = async () => {
  const collection = await getDB().collection("Articles");
  return collection;
};

module.exports = (() => {
  class Article {
    static async getAll() {
      try {
        const collection = await getCollection();

        const result = await collection
        .aggregate([
          {
            $lookup: {
              from: "Zones",
              pipeline: [],
              as: "allZones",
            },
          },
          {
            $unwind: "$allZones",
          },
          {
            $unwind: "$colors",
          },
          {
            $lookup: {
              from: "DisplaySessions",
              let: {
                article: "$article",
                color: "$colors",
                zone: "$allZones.zoneName",
              },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $and: [
                        { $eq: ["$article", "$$article"] },
                        { $eq: ["$color", "$$color"] },
                        { $eq: ["$zone", "$$zone"] },
                        { $eq: ["$endDate", null] },
                      ],
                    },
                  },
                },
              ],
              as: "activeSessions",
            },
          },
          {
            $addFields: {
              displayed: {
                $cond: {
                  if: { $gt: [{ $size: "$activeSessions" }, 0] },
                  then: true,
                  else: false,
                },
              },
            },
          },
          {
            $group: {
              _id: {
                category: "$category",
                subcategory: "$subcategory",
                article: "$article",
                zone: "$allZones.zoneName",
              },
              colors: {
                $push: {
                  color: "$colors",
                  displayed: "$displayed",
                },
              },
            },
          },
          {
            $group: {
              _id: {
                category: "$_id.category",
                subcategory: "$_id.subcategory",
                article: "$_id.article",
              },
              zones: {
                $push: {
                  zone: "$_id.zone",
                  displayed: { $max: "$colors.displayed" },
                  colors: "$colors",
                },
              },
            },
          },
          {
            $project: {
              _id: 0,
              category: "$_id.category",
              subcategory: "$_id.subcategory",
              article: "$_id.article",
              zones: 1,
            },
          },
        ])
        .toArray();

        return result;
      } catch (error) {
        throw error;
      }
    }
  }

  return Article;
})();
