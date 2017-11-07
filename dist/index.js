"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

require("./babel-polyfill");

var partialPromises = function partialPromises(promises, time, timedOut) {
  return promises.map(function (userPromise) {
    return Promise.race([userPromise, new Promise(function (resolve) {
      var timer = setTimeout(function () {
        clearTimeout(timer);
        resolve(timedOut);
      }, time);
      return timer;
    })]);
  });
};

exports.getPartialPromises = function (promises) {
  var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2000;
  var timedOut = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

  return partialPromises(promises, time, timedOut);
};

exports.getPartialResults = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(promises) {
    var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2000;
    var timedOut = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
    var filtered = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
    var p, resolved, filteredResults;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            p = partialPromises(promises, time, timedOut);
            _context.next = 3;
            return Promise.all(p);

          case 3:
            resolved = _context.sent;
            filteredResults = resolved;

            if (filtered) {
              filteredResults = filteredResults.filter(function (r) {
                return r !== timedOut;
              });
            }

            return _context.abrupt("return", filteredResults);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x3) {
    return _ref.apply(this, arguments);
  };
}();