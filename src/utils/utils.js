function extractNames(array) {
  let names = [];
  for (const a of array) names.push(a.name);
  return names.join(", ");
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function randomize(array) {
  return array[Math.floor(Math.random() * array.length)];
}

module.exports = {
  extractNames,
  capitalize,
  randomize,
};
