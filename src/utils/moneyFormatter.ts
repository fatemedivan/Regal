export const Formatter = (number: string | number) =>
  Number(number ?? 0).toLocaleString();
