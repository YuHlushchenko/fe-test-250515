export const removeExtraJokes = <T>(arr: T[], multiple: number = 10): T[] => {
  if (multiple <= 0) throw new RangeError("multiple must be greater than 0");

  const remainder = arr.length % multiple;
  return remainder === 0 ? arr : arr.slice(0, arr.length - remainder);
};
