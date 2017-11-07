import promises from "./test-promises";
import { getPartialPromises } from "../src/index";

test("Should return array of 2 promises that have < 2000ms", async () => {
  const p = await getPartialPromises(promises, 3000, 15);
  const results = await Promise.all(p);
  const resolved = results.filter(a => a !== 15);
  const timedOut = results.filter(a => a === 15);
  console.log(`Resolved: ` + resolved);
  console.log(`Timed Out: ` + timedOut);

  expect(resolved).toHaveLength(3);
});
