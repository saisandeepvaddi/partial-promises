require("./babel-polyfill");

exports.getPartialPromises = (promises, timeout = 2000, timedOut = 1) => {
  return promises.map(userPromise => {
    return Promise.race([
      userPromise,
      new Promise(resolve => {
        const timer = setTimeout(() => {
          clearTimeout(timer);
          resolve(timedOut);
        }, timeout);
        return timer;
      })
    ]);
  });
};
