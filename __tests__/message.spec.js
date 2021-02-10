const {
  buildOutfit,
  constructMessage,
  reassembleOutfit,
  bailMessage,
  goMessage,
} = require(`${__dirname}/../src/message.js`);

// const { randomize } = require(`${__dirname}/../src/utils/utils.js`);

const curConds = {
  coord: { lon: -73.5878, lat: 45.5088 },
  weather: [
    {
      id: 802,
      main: 'Clouds',
      description: 'scattered clouds',
      icon: '03d',
    },
  ],
  base: 'stations',
  main: {
    temp: -1.76,
    feels_like: -6.16,
    temp_min: -2,
    temp_max: -1.11,
    pressure: 1010,
    humidity: 59,
  },
  visibility: 10000,
  wind: { speed: 2.06, deg: 330 },
  clouds: { all: 41 },
  dt: 1612452766,
  sys: {
    type: 1,
    id: 498,
    country: 'CA',
    sunrise: 1612440690,
    sunset: 1612476306,
  },
  timezone: -18000,
  id: 6077243,
  name: 'Montreal',
  cod: 200,
};
const conditions = curConds.weather[0].description;
const temp = curConds.main.feels_like;
const clouds = curConds.clouds.all;
const wind = curConds.wind.speed;
const rain = curConds.rain?.['1h']; // No rain if undefined

const outfit = [
  [
    { name: 'thermal base layer', temp_range: [-20, 0], type: 'tops' },
    { name: 'fleece midlayer', temp_range: [-20, 15], type: 'tops' },
    { name: 'winter leggings', temp_range: [-20, -5], type: 'pants' },
    { name: 'neck gaiter', temp_range: [-20, 15], type: 'accessories' },
    {
      name: 'thermal headband',
      temp_range: [-20, -5],
      type: 'accessories',
    },
  ],
];

const reassembled = [
  [
    { name: 'thermal base layer', temp_range: [-20, 0], type: 'tops' },
    { name: 'fleece midlayer', temp_range: [-20, 15], type: 'tops' },
  ],
  [{ name: 'winter leggings', temp_range: [-20, -5], type: 'pants' }],
  [
    { name: 'neck gaiter', temp_range: [-20, 15], type: 'accessories' },
    { name: 'thermal headband', temp_range: [-20, -5], type: 'accessories' },
  ],
];
const tops = reassembled[0];
const pants = reassembled[1];
const accessories = reassembled[2];

beforeAll(() => {
  jest.spyOn(Math, 'random').mockReturnValue(0.5);
  console.log(Math.random());
});

afterAll(() => {
  jest.spyOn(Math, 'random').mockRestore();
});

describe('Build Outfit function', () => {
  test('It should compile an object by looking up variables in the wardrobe array', () => {
    expect(buildOutfit(temp, clouds, wind, rain)).toEqual(outfit);
  });
});

describe('Reassemble outfit function', () => {
  test('Should flatten the outfit object & return 3 arrays', () => {
    expect(reassembleOutfit(outfit)).toEqual(reassembled);
  });
});

describe("'Go' message function", () => {
  // jest.spyOn(Math, 'random').mockReturnValue(0.5);
  // console.log(Math.random());
  test('Should construct a message containing outfit, greeting, and quote when temperature is correct', () => {
    expect(goMessage(temp, conditions, tops, pants, accessories))
      .toBe(`Hey there! It is -6.16° and scattered clouds. Here's today's running gear:

👕: Thermal base layer, fleece midlayer
👖: Winter leggings
🧢: Neck gaiter, thermal headband

Every moment is a fresh beginning! 🌈`);
  });
});

describe('Bail message function', () => {
  test("Should generate a 'bail' message based on whether its too hot or cold", () => {
    const tooHot = 26;
    const tooCold = -26;
    expect(bailMessage(tooHot)).toEqual(
      "Hey there! Hit the snooze button, it's 26° and too hot to run."
    );
    expect(bailMessage(tooCold)).toEqual(
      "Hey there! Hit the snooze button, it's -26° and too cold to run."
    );
  });
});

// TODO: Resolve how to test the randomize() function being called
describe('Construct message function', () => {
  test('Should return a message suiting the current conditions', () => {
    expect(constructMessage(curConds))
      .toBe(`Hey there! It is -6.16° and scattered clouds. Here's today's running gear:

👕: Thermal base layer, fleece midlayer
👖: Winter leggings
🧢: Neck gaiter, thermal headband

Every moment is a fresh beginning! 🌈`);
  });
});
