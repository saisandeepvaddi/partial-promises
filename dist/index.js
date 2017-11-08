"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

require("./babel-polyfill");

var partialPromises = function partialPromises(promises, time, resolveWith) {
  return promises.map(function (userPromise) {
    return Promise.race([userPromise, new Promise(function (resolve) {
      var timer = setTimeout(function () {
        clearTimeout(timer);
        resolve(resolveWith);
      }, time);
      return timer;
    })]).catch(function (e) {
      return new Promise(function (resolve) {
        return resolve(resolveWith);
      });
    });
  });
};

exports.getPartialPromises = function (promises) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { time: 2000, resolveWith: 1 };

  if (!Array.isArray(promises)) {
    throw new Error("getPartialPromises: promises must be array of promises");
  }
  var time = options.time || 2000;
  var resolveWith = options.resolveWith || 1;
  return partialPromises(promises, time, resolveWith);
};

exports.getPartialResults = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(promises) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
      time: 2000,
      resolveWith: 1,
      filter: true
    };
    var time, resolveWith, filter, p, resolved, filteredResults;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (Array.isArray(promises)) {
              _context.next = 2;
              break;
            }

            throw new Error("getPartialPromises: promises must be array of promises");

          case 2:
            time = options.time || 2000;
            resolveWith = options.resolveWith || 1;
            filter = options.filter ? true : false;
            p = partialPromises(promises, time, resolveWith);
            _context.next = 8;
            return Promise.all(p);

          case 8:
            resolved = _context.sent;
            filteredResults = resolved;


            if (filter) {
              filteredResults = filteredResults.filter(function (r) {
                return r !== resolveWith;
              });
            }

            return _context.abrupt("return", filteredResults);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x2) {
    return _ref.apply(this, arguments);
  };
}();