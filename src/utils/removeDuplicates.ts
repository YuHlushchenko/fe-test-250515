export const removeDuplicates = <T, K extends keyof T>(
  arr: T[],
  key: K
): T[] => {
  return Array.from(
    arr
      .reduce((acc, item) => acc.set(item[key], item), new Map<T[K], T>())
      .values()
  );
};
