const { GraphQLError } = require("graphql");
const DisplaySession = require("../models/displaySession.js");
const Article = require("../models/article.js");

module.exports = {
  displayTypes: `#graphql

    type DisplayArticle {
      category: String
      subcategory: String
      article: String
      zones: [DisplayZone]
    }

    type DisplayZone {
      zone: String
      displayed: Boolean
      colors: [ArticleColor]
    }

    type ArticleColor {
      color: String
      displayed: Boolean
    }

    type AllDisplayData {
      activeDisplay: [DisplayArticle]
    }

    type Query {
      GetAllDisplay: AllDisplayData
    }
	`,

  displayResolvers: {
    Query: {
      GetAllDisplay: async (_, __, ctx) => {
        try {
          await ctx.auth();
          const result = await Article.getAll();

          return { activeDisplay: result };
        } catch (error) {
          throw new GraphQLError(error.message);
        }
      },
    },
  },
};
