require("./babel-polyfill");

const partialPromises = (promises, time, timedOut) =>
  promises.map(userPromise => {
    return Promise.race([
      userPromise,
      new Promise(resolve => {
        const timer = setTimeout(() => {
          clearTimeout(timer);
          resolve(timedOut);
        }, time);
        return timer;
      })
    ]);
  });

exports.getPartialPromises = (promises, time = 2000, timedOut = 1) => {
  return partialPromises(promises, time, timedOut);
};

exports.getPartialResults = async (
  promises,
  time = 2000,
  timedOut = 1,
  filtered = true
) => {
  const p = partialPromises(promises, time, timedOut);
  const resolved = await Promise.all(p);
  let filteredResults = resolved;
  if (filtered) {
    filteredResults = filteredResults.filter(r => r !== timedOut);
  }

  return filteredResults;
};
