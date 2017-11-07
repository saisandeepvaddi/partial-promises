const createTimerPromise = timeout => {
  return new Promise(resolve => {
    const timer = setTimeout(() => {
      clearTimeout(timer);
      resolve(timeout);
    }, timeout);
    return timer;
  });
};

export default createTimerPromise;
