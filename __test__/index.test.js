import { createResolvePromise, createRejectPromise } from "./test-promises";
import { getPartialPromises, getPartialResults } from "../dist/index";

// Do not create promises array outside.
// Second test always fails because by the time second test runs promises are resolved in first

const print = a => console.log(JSON.stringify(a, null, 2));

describe("getPartialPromises: ", () => {
  test("Resolve < 3000 to be 3 promises", async () => {
    // expect.assertions(1);
    const promises = [
      createResolvePromise(1000),
      createResolvePromise(2000),
      createResolvePromise(3000),
      createResolvePromise(4000),
      createResolvePromise(5000)
    ];
    const p = await getPartialPromises(promises, 3000, 15);
    const results = await Promise.all(p);
    const resolved = results.filter(a => a !== 15);
    const timedOut = results.filter(a => a === 15);

    expect(resolved).toHaveLength(3);
  });
});

describe("getPartialResults", () => {
  test("resolve < 3000 to be 3 values", async () => {
    expect.assertions(1);
    const promises = [
      createRejectPromise(1000),
      createResolvePromise(2000),
      createResolvePromise(3000),
      createResolvePromise(4000),
      createResolvePromise(5000)
    ];
    const p = await getPartialResults(promises, 3000);
    expect(p).toHaveLength(3);
  });
});
