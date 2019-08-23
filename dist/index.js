"use strict";

if (process.env.NODE_ENV === "production") {
  module.exports = require("./partialpromises.cjs.production.min.js");
} else {
  module.exports = require("./partialpromises.cjs.development.js");
}
