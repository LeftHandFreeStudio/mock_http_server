# Mock Http Server

mostly for local development purposes.
It allows you to mock your endpoints for local development and share it easily with your team.

To run it simply run:

`mck`

To configure it according to your requirements you can provide `config.json` file in the root of your project. Created API will have a structure defined there. You can find example configuration in `config/defaultConfig.json`.

If you want to have some generated data returned by the endpoint, you can set a property `generateResponse` inside a particular path. This object should have following properties:

- `locale` - sets the locale of generated data
- `seed` - sets the random seed. It assured repeatable results across runs.
- `count` - how many object should the resposne contain. If count is set to `0`, resposne will contain JSON object instead of array.
- `objectProperties` - here you can define properties of each object. Each entry is responsible for a single property. `value` will be used as a name for object property. `path` defines Faker API which should be used to generate target value. For example `name.lastName` will generate lastName according to [Faker API](https://github.com/marak/Faker.js).
