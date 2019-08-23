# partial-promises

Cancel reject/pending promises after a timeout. You pass an array of promises, if some of them stay in pending or reject, `partial-promises` cancels those promises and returns only those that will resolve within a timeout.

# Installation & Usage

```shell
  $> npm install partial-promises

  (or)

  $> yarn add partial-promises
```

```js
import { getPartialPromises, getPartialResults } from "partial-promises";

// or

const pp = require("partial-promises");
```

```js
const promises = [
  createResolvePromise(1000), // Promise that resolves at 1sec with 1000
  createRejectPromise(2000), // Promise that rejects
  createResolvePromise(3000), // Promise that resolves at 3sec with 3000
  createResolvePromise(4000), // Promise that resolves at 4sec with 4000
  createResolvePromise(5000), // Promise that resolves at 5sec with 5000. We don't want to wait 5sec. Out limit is 4sec
];

const p = pp.getPartialPromises(promises, { time: 4000, resolveWith: "hello" });
Promise.all(p).then(d => console.log(d)); // [1000, "hello", 3000, 4000]

const pr = pp.getPartialResults(promises, { time: 4000 });
pr.then(a => console.log(a)); // [1000, 3000, 4000]
```

Check [test/index.test.ts](test/index.test.ts) for more usage examples.

# API

## 1. getPartialPromises(promises[, options])

Returns array of promises that will always resolve, either with their actual value or **options.resolveWith** value

- promises - array of promises
- options
  - time
    - time in msec after _getPartialPromises_ returns whatever promises resolved till then.
    - default is **_2000_**
  - resolveWith
    - value to be replaced for rejected and timed out
    - default is **_1_**

## Note:

After using _getPartialPromises()_, returned promises can be filtered and take resolved and discard promises with _resolveWith_ value.

```js
// Example:

const promises = [
  resolvePromise(1000), // resolves after 1 sec and returns 1000
  rejectPromise(2000), // rejects after 2 sec
  resolvePromise(3000),
  resolvePromise(4000),
  resolvePromise(5000),
];

const p = await getPartialPromises(promises, {
  time: 3000,
  resolveWith: 1,
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
    - default is **_2000_**
  - resolveWith
    - value to be replaced for rejected and timed out
    - default is **_1_**
  - filter
    - filters out results that are same as _resolveWith_
    - default is **_false_**

```js
const promises = [
  resolvePromise(1000), // resolves after 1 sec and returns 1000
  rejectPromise(2000), // rejects after 2 sec
  resolvePromise(3000),
  resolvePromise(4000),
  resolvePromise(5000),
];

const p = await getPartialResults(promises, { time: 3000 });
// [1000, 3000]
// See ? You don't have to use Promise.all(p) & filter again like in getPartialPromises

// You can choose to not filter automatically so that you want to filter later.

const q = await getPartialResults(promises, {
  time: 3000,
  filter: false,
  resolveWith: -1, // default is 1
});
// [1000, -1, 3000] no filtering of -1 which is result of rejected promise
```

# License

[MIT](/LICENSE) &copy; [Sai Sandeep Vaddi](https://github.com/saisandeepvaddi)
