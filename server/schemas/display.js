const { GraphQLError } = require("graphql");
const DisplaySession = require("../models/displaySession.js");
const Article = require("../models/article.js");
const { excludeNoChanges, findCloseDisplay } = require("../utils/logic/customFilter.js");

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

    type UpdateResponse {
      status: Int
    }

    input DisplayInput {
      category: String
      subcategory: String
      article: String
      zones: [ZoneInput]
    }

    input ZoneInput {
      zone: String
      displayed: Boolean
      colors: [ColorInput]
    }

    input ColorInput {
      color: String
      displayed: Boolean
    }

    input UpdateInput {
      data: [DisplayInput]
    }

    type Query {
      GetAllDisplay: AllDisplayData
    }

    type Mutation {
      UpdateDisplay(input: UpdateInput): UpdateResponse
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

    Mutation: {
      UpdateDisplay: async (_, { input }, ctx) => {
        try {
          await ctx.auth();
          const { data } = input;

          const currentlyDisplayed = [];
          const notDisplayed = [];

          data.forEach((article) => {
            const {
              category,
              subcategory,
              article: articleId,
              zones,
            } = article;

            zones.forEach((zone) => {
              const { zone: zoneName, colors } = zone;

              colors.forEach((color) => {
                const { color: colorName, displayed } = color;

                const item = {
                  category,
                  subcategory,
                  article: articleId,
                  color: colorName,
                  zone: zoneName,
                };

                if (displayed) {
                  currentlyDisplayed.push(item);
                } else {
                  notDisplayed.push(item);
                }
              });
            });
          });

          const activeDisplays = await DisplaySession.getActive();
          const newDisplays = excludeNoChanges(activeDisplays, currentlyDisplayed);
          
          if(newDisplays.length > 0) {
            await DisplaySession.openDisplay(newDisplays);
            console.log("Added new DisplaySession records");
          }

          const removedDisplays = findCloseDisplay(activeDisplays, notDisplayed);
          if(removedDisplays.length > 0) {
            console.log(removedDisplays);
            await DisplaySession.closeDisplay(removedDisplays);
            console.log("Closed DisplaySession records");
          }

          return { status: 200 };
        } catch (error) {
          throw new GraphQLError(error.message);
        }
      },
    },
  },
};
