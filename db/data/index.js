const ENV = process.env.NODE_ENV || "development";

const devData = require("./development-data/index");
const testData = require("./test-data/index");

const data = {
  production: devData,
  development: devData,
  test: testData,
};

module.exports = data[ENV];
