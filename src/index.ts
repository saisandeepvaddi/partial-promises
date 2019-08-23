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
  filter?: boolean;
}

export function getPartialPromises(
  promises: Promise<any>[],
  options: IPartialProimsesOptions
) {
  const time = options.time || 2000;
  const resolveWith = options.resolveWith || 1;
  return partialPromises(promises, time, resolveWith);
}

interface IPartialResultsOptions {
  time?: number;
  resolveWith?: any;
  filter?: boolean;
}

export async function getPartialResults(
  promises: Promise<any>[],
  options: IPartialResultsOptions
) {
  const time = options.time || 2000;
  const resolveWith = options.resolveWith || 1;
  const filter = options.filter === false ? false : true;

  const p = partialPromises(promises, time, resolveWith);
  const resolved = await Promise.all(p);
  return filter ? resolved.filter(r => r !== resolveWith) : resolved;
}
