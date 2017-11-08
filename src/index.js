require("./babel-polyfill");

const partialPromises = (promises, time, resolveWith) =>
  promises.map(userPromise => {
    return Promise.race([
      userPromise,
      new Promise(resolve => {
        const timer = setTimeout(() => {
          clearTimeout(timer);
          resolve(resolveWith);
        }, time);
        return timer;
      })
    ]).catch(e => new Promise(resolve => resolve(resolveWith)));
  });

exports.getPartialPromises = (
  promises,
  options = { time: 2000, resolveWith: 1 }
) => {
  if (!Array.isArray(promises)) {
    throw new Error(`getPartialPromises: promises must be array of promises`);
  }
  const time = options.time || 2000;
  const resolveWith = options.resolveWith || 1;
  return partialPromises(promises, time, resolveWith);
};

exports.getPartialResults = async (
  promises,
  options = {
    time: 2000,
    resolveWith: 1,
    filter: true
  }
) => {
  if (!Array.isArray(promises)) {
    throw new Error(`getPartialPromises: promises must be array of promises`);
  }
  const time = options.time || 2000;
  const resolveWith = options.resolveWith || 1;
  const filter = options.filter ? true : false;
  const p = partialPromises(promises, time, resolveWith);
  const resolved = await Promise.all(p);
  let filteredResults = resolved;

  if (filter) {
    filteredResults = filteredResults.filter(r => r !== resolveWith);
  }

  return filteredResults;
};
