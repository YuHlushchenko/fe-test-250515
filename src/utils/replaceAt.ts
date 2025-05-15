export const replaceElement = <T>(
  arr: T[],
  index: number,
  newElement: T
): T[] => {
  if (index < 0 || index >= arr.length) {
    console.warn(`replaceAt: Index ${index} is out of bounds.`);

    return arr;
  }

  return arr.map((item, i) => (i === index ? newElement : item));
};
