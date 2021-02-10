beforeAll(() => {
  jest.spyOn(Math, 'random').mockReturnValue(0.5);
  console.log(Math.random());
});

afterAll(() => {
  jest.spyOn(Math, 'random').mockRestore();
});

const { extractNames, capitalize, randomize } = require(`${__dirname}/../src/utils/utils.js`);

describe('Extract names function', () => {
  test('Should extract the name fields from objects and add to an array', () => {
    const input = [{ name: 'shorts', type: 'pants', temp_range: [15, 25] }];
    const output = 'shorts';

    expect(extractNames(input)).toEqual(output);
  });
});

describe('Capitalize function', () => {
  test('Should capitalize the first character of a string', () => {
    const input = 'test';
    const output = 'Test';

    expect(capitalize(input)).toEqual(output);
  });
});

describe('Randomize function', () => {
  test('Should return a random element of an array', () => {
    const input = ['Good morning', 'Howdy', 'Hey there', 'Ahoy'];
    const output = 'Hey there'; // global.Math above ensures this

    expect(randomize(input)).toEqual(output);
  });
});
