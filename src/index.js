const express = require('express');
const path = require('path');
const cors = require('cors');
let config = require('../config/defaultConfig.json');

try {
  const configPath = process.cwd() + path.sep + 'config.json';
  config = require(configPath);
  console.log('Using custom config from config.json.');
} catch {}

const seed = getRandomSeedFromConfig();
const app = express();

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

function getRandomSeedFromConfig() {
  if (config.generator && config.generator.seed) {
    return config.generator.seed;
  }
  return Math.floor(Math.random() * 10e6);
}

module.exports.app = app;
