export const toPxels = (value: string | number) =>
  Number.isNaN(Number(value)) ? value : `${value}px`;
