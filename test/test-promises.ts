export const createResolvePromise = (timeout: number) => {
  return new Promise(resolve => {
    const timer = setTimeout(() => {
      clearTimeout(timer);
      resolve(timeout);
    }, timeout);
  });
};

export const createRejectPromise = (timeout: number) => {
  return new Promise((_resolve, reject) => {
    const timer = setTimeout(() => {
      clearTimeout(timer);
      reject(timeout);
    }, timeout);
  });
};
