const wardrobe = require("./data/wardrobe.js");
const quotes = require("./data/quotes.js");
const greetings = require("./data/greetings.js");

const { extractNames, capitalize, randomize } = require("./utils/utils.js");

const greeting = randomize(greetings);

function buildOutfit(temp, clouds, wind, rain) {
  outfit = [];

  // Check for items required for current temp
  outfit.push(
    wardrobe.filter(
      (el) =>
        el.temp_range && el.temp_range[0] <= temp && el.temp_range[1] >= temp
    )
  );
  // check for items required for cloud cover, wind & rain
  if (!clouds) {
    outfit.push(wardrobe.filter((el) => el.isSunny && el.isSunny === true));
  }
  if (wind >= 10) {
    outfit.push(wardrobe.filter((el) => el.isWindy && el.isWindy === true));
  }
  if (rain) {
    outfit.push(wardrobe.filter((el) => el.isRainy && el.isRainy === true));
  }
  return outfit;
}

function reassembleOutfit(outfit) {
  flatOutfit = outfit.flat();
  const tops = flatOutfit.filter((el) => el.type === "tops");
  const pants = flatOutfit.filter((el) => el.type === "pants");
  const accessories = flatOutfit.filter((el) => el.type === "accessories");
  return [tops, pants, accessories];
}

function bailMessage(temp) {
  return `${greeting}! Hit the snooze button, it's ${temp}° and ${
    temp < -20 ? "too cold" : "too hot"
  } to run.`;
}
function goMessage(temp, conditions, tops, pants, accessories) {
  return `${greeting}! It is ${temp}° and ${conditions}. Here's today's running gear:

👕: ${capitalize(extractNames(tops))}
👖: ${capitalize(extractNames(pants))}
🧢: ${capitalize(extractNames(accessories))}

${randomize(quotes)}! 🌈`;
}

function constructMessage(curConds) {
  const conditions = curConds.weather[0].description;
  const temp = curConds.main.feels_like;
  const clouds = curConds.clouds.all;
  const wind = curConds.wind.speed;
  const rain = curConds.rain?.["1h"]; // No rain if undefined

  // Find all the nececessary gear for the conditions
  outfit = buildOutfit(temp, clouds, wind, rain);
  // Reassmble the object into categories
  const [tops, pants, accessories] = reassembleOutfit(outfit);

  // Retrieve bail/go messages
  const bail = bailMessage(temp);
  const go = goMessage(temp, conditions, tops, pants, accessories);

  const textMessage = temp >= -20 && temp <= 25 ? go : bail;

  return textMessage;
}

module.exports = {
  constructMessage,
  buildOutfit,
  reassembleOutfit,
  bailMessage,
  goMessage,
};
