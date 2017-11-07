import createTimerPromise from "./test-promises";
import { getPartialPromises, getPartialResults } from "../dist/index";

// Do not create promises array outside.
// Second test always fails because by the time second test runs promises are resolved in first

describe("getPartialPromises: ", () => {
  test("Resolve < 3000 to be 3 promises", async () => {
    expect.assertions(1);
    const promises = [
      createTimerPromise(1000),
      createTimerPromise(2000),
      createTimerPromise(3000),
      createTimerPromise(4000),
      createTimerPromise(5000)
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
      createTimerPromise(1000),
      createTimerPromise(2000),
      createTimerPromise(3000),
      createTimerPromise(4000),
      createTimerPromise(5000)
    ];
    const p = await getPartialResults(promises, 3000);
    expect(p).toHaveLength(3);
  });
});
