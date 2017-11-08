exports.createResolvePromise = timeout => {
  return new Promise(resolve => {
    const timer = setTimeout(() => {
      clearTimeout(timer);
      resolve(timeout);
    }, timeout);
  });
};

exports.createRejectPromise = timeout => {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      clearTimeout(timer);
      reject(timeout);
    }, timeout);
  });
};
