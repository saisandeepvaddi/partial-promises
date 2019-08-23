import { createResolvePromise, createRejectPromise } from "./test-promises";
import { getPartialPromises, getPartialResults } from "../dist";

describe("getPartialPromises: ", () => {
  it("Should return correct resolved promises with default resolveWith", async () => {
    const promises = [
      createResolvePromise(1000),
      createRejectPromise(2000),
      createResolvePromise(3000),
      createResolvePromise(4000),
      createResolvePromise(5000),
    ];
    const p = await getPartialPromises(promises, {
      time: 3000,
    });
    const results = await Promise.all(p);
    const resolved = results.filter(a => a !== 1);

    expect(resolved).toHaveLength(2);
  });

  it("Should return correct resolved promises with custom resolveWith", async () => {
    const promises = [
      createResolvePromise(1000),
      createRejectPromise(2000),
      createResolvePromise(3000),
      createResolvePromise(4000),
      createResolvePromise(5000),
    ];
    const p = await getPartialPromises(promises, {
      time: 3000,
      resolveWith: "Hinata Hyuga",
    });
    const results = await Promise.all(p);
    const resolved = results.filter(a => a !== "Hinata Hyuga");
    expect(resolved).toHaveLength(2);
  });
});

describe("getPartialResults: ", () => {
  it("Should automatically filter reject promises and return correct resolve promises", async () => {
    const promises = [
      createResolvePromise(1000),
      createRejectPromise(2000),
      createResolvePromise(3000),
      createResolvePromise(4000),
      createResolvePromise(5000),
    ];
    const p = await getPartialResults(promises, { time: 3000 });
    expect(p).toHaveLength(2);
  });

  it("Should return correct resolved promises without filter", async () => {
    const promises = [
      createResolvePromise(1000),
      createRejectPromise(2000),
      createResolvePromise(3000),
      createResolvePromise(4000),
      createResolvePromise(5000),
    ];
    const p = await getPartialResults(promises, {
      time: 3000,
      filter: false,
    });
    // Should return all promises but rejects replaced with 1
    expect(p).toHaveLength(5);
    const arrayWithResolveWithValues = p.filter(x => x === 1);
    // 2 resolved promises, 3 replaced promises
    expect(arrayWithResolveWithValues).toHaveLength(3);
  });

  it("Should return correct promises with custom resolveWith", async () => {
    const promises = [
      createResolvePromise(1000),
      createRejectPromise(2000),
      createResolvePromise(3000),
      createResolvePromise(4000),
      createResolvePromise(5000),
    ];
    const p = await getPartialResults(promises, {
      time: 3000,
      filter: false,
      resolveWith: "Naruto Uzumaki",
    });
    // Should return all promises but rejects replaced with 1
    expect(p).toHaveLength(5);

    const arrayWithResolveWithValues = p.filter(x => x === "Naruto Uzumaki");
    // 2 resolved promises, 3 replaced promises
    expect(arrayWithResolveWithValues).toHaveLength(3);
  });
});
