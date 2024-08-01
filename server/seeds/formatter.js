const data = require('../data/articles.json')
const fs = require('fs')
const transformData = (data) => {
  // Create a map to hold the transformed data
  const map = new Map();

  // Iterate over each item in the input data
  data.forEach(item => {
    const { category, subcategory, article, color } = item;
    const key = `${category}-${subcategory}-${article}`;

    // Check if the key already exists in the map
    if (!map.has(key)) {
      // If not, create a new entry
      map.set(key, {
        category,
        subcategory,
        article,
        colors: [color]
      });
    } else {
      // If yes, push the new color to the existing entry
      map.get(key).colors.push(color);
    }
  });

  // Convert the map to an array
  return Array.from(map.values());
};

const transformedData = transformData(data);
fs.writeFileSync('./data/articles.json', JSON.stringify(transformedData, null, 2));
console.log(JSON.stringify(transformedData, null, 2));
