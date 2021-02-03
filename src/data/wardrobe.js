const wardrobe = [
  {
    name: "thermal base layer",
    type: "tops",
    temp_range: [-20, 0],
  },
  {
    name: "fleece midlayer",
    type: "tops",
    temp_range: [-20, 15],
  },
  {
    name: "winter leggings",
    type: "pants",
    temp_range: [-20, -5],
  },
  {
    name: "neck gaiter",
    type: "accessories",
    temp_range: [-20, 15],
  },
  {
    name: "sunglasses",
    type: "accessories",
    isSunny: true,
  },
  {
    name: "wind jacket",
    type: "tops",
    isWindy: true,
  },
  { name: "tank top", type: "tops", temp_range: [15, 25] },

  {
    name: "light leggings",
    type: "pants",
    temp_range: [-5, 15],
  },
  { name: "shorts", type: "pants", temp_range: [15, 25] },
  {
    name: "wool socks",
    type: "accessories",
    temp_range: [-20, -10],
  },
  {
    name: "thermal headband",
    type: "accessories",
    temp_range: [-20, -5],
  },
];

module.exports = wardrobe;
