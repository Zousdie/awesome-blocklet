const fs = require('fs');
const path = require('path');
const express = require("express");

module.exports = (app) => {
  app.use(express.static(path.join(__dirname, '../build')));
  app.get('/', (req, res) => {
    res.send(fs.readFileSync(path.resolve(__dirname, '../build/index.html')).toString())
  });
};
