const appModule = require('./index');
let config = require('../config/defaultConfig.json');

try {
  const configPath = process.cwd() + path.sep + 'config.json';
  config = require(configPath);
  console.log('Using custom config from config.json.');
} catch {}
const defaultPort = config.port ? config.port : 6969;

appModule.app.listen(defaultPort);
console.log(`Mock server running on port ${defaultPort}`);
