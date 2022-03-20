const range = (start: number, end: number) : Array<Number> => {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

export default range;