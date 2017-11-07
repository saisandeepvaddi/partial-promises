const createTimerPromise = timeout => {
  return new Promise(resolve => {
    const timer = setTimeout(() => {
      clearTimeout(timer);
      resolve(timeout);
    }, timeout);
    return timer;
  });
};
const promises = [
  createTimerPromise(1000),
  createTimerPromise(2000),
  createTimerPromise(3000),
  createTimerPromise(4000),
  createTimerPromise(5000)
];

export default promises;
