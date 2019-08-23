/**
 * Returns promises that always resolve with the actual results of the promises or user chosen value.
 *
 * @param {Promise<any>[]} promises Array promises
 * @param {number} time Timeout in milliseconds
 * @param {*} resolveWith Value to return for reject/pending promises
 * @returns {Promise<any>[]} Array of promises with reject/pending promises set to return resolveWith value
 */
function partialPromises(
  promises: Promise<any>[],
  time: number,
  resolveWith: any
): Promise<any>[] {
  return promises.map((userPromise: Promise<any>) => {
    return Promise.race([
      userPromise,
      new Promise(resolve => {
        const timer = setTimeout(() => {
          clearTimeout(timer);
          resolve(resolveWith);
        }, time);
      }),
    ]).catch(() => new Promise(resolve => resolve(resolveWith)));
  });
}

interface IPartialProimsesOptions {
  time?: number;
  resolveWith?: any;
}

/**
 * Returns array of promises where reject/pending promises modified to cancel and resolve with a custom value
 *
 * @export
 * @param {Promise<any>[]} promises Array of promises
 * @param {IPartialProimsesOptions} [options={ time: 2000, resolveWith: 1 }] Optional options object
 * @returns Array of promises
 */
export function getPartialPromises(
  promises: Promise<any>[],
  options?: IPartialProimsesOptions
) {
  let _options = null;
  if (!options) {
    _options = { time: 2000, resolveWith: 1 };
  } else {
    _options = { ...options };
  }
  const time = _options.time || 2000;
  const resolveWith = _options.resolveWith || 1;
  return partialPromises(promises, time, resolveWith);
}

interface IPartialResultsOptions {
  time?: number;
  resolveWith?: any;
  filter?: boolean;
}

/**
 * Awaits promises until timeout and returns their values.
 *
 * @export
 * @param {Promise<any>[]} promises Array of promises
 * @param {IPartialResultsOptions} [options={ time: 2000, resolveWith: 1, filter: true }] Optional options object
 * @returns Array of promises with filtered/not-filtered results
 */
export async function getPartialResults(
  promises: Promise<any>[],
  options?: IPartialResultsOptions
) {
  let _options = null;
  if (!options) {
    _options = { time: 2000, resolveWith: 1, filter: true };
  } else {
    _options = { ...options };
  }
  const time = _options.time || 2000;
  const resolveWith = _options.resolveWith || 1;
  const filter = _options.filter === false ? false : true;

  const p = partialPromises(promises, time, resolveWith);
  const resolved = await Promise.all(p);
  return filter ? resolved.filter(r => r !== resolveWith) : resolved;
}
