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
    expect(resolved.sort()).toEqual([1000, 3000]);

    const filtered = results.filter(a => a === 1);
    expect(filtered).toEqual([1, 1, 1]);
  });

  it("Should return correct resolved promises with custom resolveWith", async () => {
    const promises = [
      createResolvePromise(1000),
      createRejectPromise(2000),
      createRejectPromise(3000),
      createResolvePromise(4000),
      createResolvePromise(5000),
    ];
    const p = await getPartialPromises(promises, {
      time: 4000,
      resolveWith: "Hinata Hyuga",
    });
    const results = await Promise.all(p);
    const filtered = results.filter(a => a === "Hinata Hyuga");
    expect(filtered).toEqual(["Hinata Hyuga", "Hinata Hyuga", "Hinata Hyuga"]);

    const resolved = results.filter(a => a !== "Hinata Hyuga");
    expect(resolved.sort()).toEqual([1000, 4000]);
  });

  it("Should return correct resolved promises without options", async () => {
    const promises = [
      createResolvePromise(1000),
      createRejectPromise(2000),
      createResolvePromise(3000),
      createResolvePromise(4000),
      createResolvePromise(5000),
    ];
    const p = await getPartialPromises(promises);
    const results = await Promise.all(p);
    const resolved = results.filter(a => a !== 1); // 1 is the default resolveWith, 2sec is default time
    expect(resolved).toEqual([1000]);

    const filtered = results.filter(a => a === 1);
    expect(filtered).toEqual([1, 1, 1, 1]);
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
    const results = await getPartialResults(promises, { time: 3000 });
    expect(results).toEqual([1000, 3000]);
  });

  it("Should return correct resolved promises without filter", async () => {
    const promises = [
      createResolvePromise(1000),
      createRejectPromise(2000),
      createResolvePromise(3000),
      createResolvePromise(4000),
      createResolvePromise(5000),
    ];
    const results = await getPartialResults(promises, {
      time: 3000,
      filter: false,
    });

    expect(results).toHaveLength(5);

    const resolved = results.filter(x => x !== 1);
    // Should return all promises but rejects replaced with 1
    expect(resolved.sort()).toEqual([1000, 3000]);

    const filtered = results.filter(x => x === 1);
    // 2 resolved promises, 3 replaced promises
    expect(filtered).toEqual([1, 1, 1]);
  });

  it("Should return correct promises with custom resolveWith", async () => {
    const promises = [
      createResolvePromise(1000),
      createRejectPromise(2000),
      createResolvePromise(3000),
      createResolvePromise(4000),
      createResolvePromise(5000),
    ];
    const results = await getPartialResults(promises, {
      time: 3000,
      filter: false,
      resolveWith: "Naruto Uzumaki",
    });
    // Should return all promises but rejects replaced with 1
    expect(results).toHaveLength(5);

    const resolved = results.filter(x => x !== "Naruto Uzumaki");
    expect(resolved).toEqual([1000, 3000]);

    const filtered = results.filter(x => x === "Naruto Uzumaki");
    // 2 resolved promises, 3 replaced promises
    expect(filtered).toEqual([
      "Naruto Uzumaki",
      "Naruto Uzumaki",
      "Naruto Uzumaki",
    ]);
  });

  it("Should return correct promises without options", async () => {
    const promises = [
      createResolvePromise(1000),
      createRejectPromise(2000),
      createResolvePromise(3000),
      createResolvePromise(4000),
      createResolvePromise(5000),
    ];

    const results = await getPartialResults(promises);

    // Default time is 2sec.
    expect(results).toEqual([1000]);
  });
});
