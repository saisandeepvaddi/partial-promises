"use strict";

require("./babel-polyfill");

exports.getPartialPromises = function (promises) {
  var timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2000;
  var resolved = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

  return promises.map(function (userPromise) {
    return Promise.race([userPromise, new Promise(function (resolve) {
      var timer = setTimeout(function () {
        clearTimeout(timer);
        resolve(resolved);
      }, timeout);
      return timer;
    })]);
  });
};