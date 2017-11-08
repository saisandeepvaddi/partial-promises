import { createResolvePromise, createRejectPromise } from "./test-promises";
import { getPartialPromises, getPartialResults } from "../dist/index";

// Increase test suite timeout for longer async test cases
let originalTimeout;
beforeEach(function() {
  originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
});

afterEach(function() {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
});

// Do not create promises array outside.
// Second test always fails because by the time second test runs promises are resolved in first

const print = a => console.log(JSON.stringify(a, null, 2));

describe("getPartialPromises: ", () => {
  test("Resolve < 3000 to be 3 promises", async () => {
    const promises = [
      createResolvePromise(1000),
      createRejectPromise(2000),
      createResolvePromise(3000),
      createResolvePromise(4000),
      createResolvePromise(5000)
    ];

    const p = await getPartialPromises(promises, {
      time: 3000,
      resolveWith: 1
    });
    const results = await Promise.all(p);
    const resolved = results.filter(a => a !== 1);
    const timedOut = results.filter(a => a === 1);

    expect(resolved).toHaveLength(2);
  });
});

describe("getPartialResults", () => {
  test("resolve < 3000 to be 3 values", async () => {
    const promises = [
      createRejectPromise(1000),
      createResolvePromise(2000),
      createResolvePromise(3000),
      createResolvePromise(4000),
      createResolvePromise(5000)
    ];
    const p = await getPartialResults(promises, { time: 3000, filter: true });
    expect(p).toHaveLength(2);
  });
});
