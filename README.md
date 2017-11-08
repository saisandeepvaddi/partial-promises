# partial-promises

Collect promises resolved within a timeout when using `Promise.all([p])` and discard __pending__ and __rejected__ promises.

## Will publish to [NPM](https://www.npmjs.com/) shortly

# Usecases
```js
  // Consider the following scenario

  // will_resolve -> promise that will resolve
  // will_reject -> promises that will reject
  // will_take_long -> promise that will take too long and stuck in pending

  const i_wont_resolve = await Promise.all([will_resolve, will_reject]);

  // Because of will_reject, you won't know what will_resolve promise resolves to and results will have to catch

  const neither_do_i_for_long_time = await Promise.all([will_resolve, will_take_long])
  
  // Because of will_take_long, will_resolve also will be waiting
  // Ofcouse, that is the purpose of Promise.all, to wait for all promises to resolve or reject and return as a single promise

  // But you want promises that get resolved and discard rejects and pendings after a timeout.

  // Enter partial-promises 🔥🔥🔥

```

# Methods
## 1. getPartialPromises(promises[, options])
Returns array of promises that will always resolve, either with their actual value or __options.resolveWith__ value

- promises - array of promises
- options
  - time
    - time in msec after _getPartialPromises_ returns whatever promises resolved till then.
    - default is 2000
  - resolveWith
    - value to be replaced for rejected and timed out 
    - default is 1

## Note: 
After using _getPartialPromises()_, returned promises can be filtered and take resolved and discard promises with _resolveWith_ value.

```js
  // Example: 

  const promises = [
      resolvePromise(1000), // resolves after 1 sec and returns 1000
      rejectPromise(2000),  // rejects after 2 sec
      resolvePromise(3000),
      resolvePromise(4000),
      resolvePromise(5000)
    ];

    const p = await getPartialPromises(promises, {
      time: 3000,
      resolveWith: 1
    });

    const results = await Promise.all(p);
    // results = [1000, 1, 3000]

    const resolved = results.filter(a => a !== 1); // 1 is resolveWith value
    // resolved = [1000, 3000]
```

## 2. getPartialResults(promises[, options])

Same as _getPartialPromises_ but intead of returning array of promises, returns array of resolved values, optionally filters out resolveWith values out-of-the-box 
- promises - array of promises
- options
  - time
    - time in msec after _getPartialResults_ returns whatever promises resolved till then.
    - default is 2000
  - resolveWith
    - value to be replaced for rejected and timed out 
    - default is _1_
  - filter
    - filters out results that are same as _resolveWith_
    - default is _true_

```js
const promises = [
      resolvePromise(1000), // resolves after 1 sec and returns 1000
      rejectPromise(2000),  // rejects after 2 sec
      resolvePromise(3000),
      resolvePromise(4000),
      resolvePromise(5000)
    ];

    const p = await getPartialResults(promises, { time: 3000 });
    // [1000, 3000]
    // See ? You don't have to use Promise.all(p) & filter again like in getPartialPromises

    const q = await getPartialResults(promises, { time: 3000, filter: false, resolveWith : -1 });
    // [1000, -1, 3000] no filtering of -1 which is result of rejected promise

```


# License

[MIT](/LICENSE) &copy; [Sai Sandeep Vaddi](https://github.com/saisandeepvaddi)