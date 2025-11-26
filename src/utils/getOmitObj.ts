export const getOmitObj = <T extends object, K extends keyof T>(
  initialObj: T,
  omitKey: K,
): Omit<T, K> => {
  return Object.keys(initialObj).reduce(
    (res, key) => {
      if (key !== omitKey) {
        res[key as Exclude<keyof T, K>] = initialObj[key];
      }
      return res;
    },
    {} as Omit<T, K>,
  );
};
