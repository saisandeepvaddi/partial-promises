"use strict";

var createTimerPromise = function createTimerPromise(timeout) {
  return new Promise(function (resolve) {
    var timer = setTimeout(function () {
      clearTimeout(timer);
      resolve(1);
    }, timeout);
    return timer;
  });
};
exports.promises = [createTimerPromise(1000), createTimerPromise(2000), createTimerPromise(3000), createTimerPromise(4000), createTimerPromise(5000)];