require("./babel-polyfill");

exports.getPartialPromises = (promises, timeout = 2000, resolved = 1) => {
  return promises.map(userPromise => {
    return Promise.race([
      userPromise,
      new Promise(resolve => {
        const timer = setTimeout(() => {
          clearTimeout(timer);
          resolve(resolved);
        }, timeout);
        return timer;
      })
    ]);
  });
};
