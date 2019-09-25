const express = require('express');
const path = require('path');
const cors = require('cors');
let config = require('../config/defaultConfig.json');

try {
  const configPath = process.cwd() + path.sep + 'config.json';
  config = require(configPath);
  console.log('Using custom config from config.json.');
} catch {}

const app = express();
const defaultPort = config.port ? config.port : 6969;

app.use(cors());

app.get('/', function(req, res) {
  res.send('Welcome to the root!');
});

Object.keys(config.paths).forEach(path => {
  Object.keys(config.paths[path]).forEach(method => {
    const methodObject = config.paths[path][method];
    const endPoint = app[method].bind(app);
    if (methodObject.response) {
      const response = methodObject.response;
      endPoint('/' + path, function(req, res) {
        res.status(response.status).json(response.body);
      });
    } else {
      endPoint('/' + path, function(req, res) {
        res.json({ defaultValue: `Hello World from ${path}` });
      });
    }
  });
});

app.listen(defaultPort);
console.log(`Mock server running on port ${defaultPort}`);
