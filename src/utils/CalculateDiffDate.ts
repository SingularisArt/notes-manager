const CalculateDiffDate = (dueDate: string) => {
  const today = new Date();
  const oneDay = 24 * 60 * 60 * 1000;

  const diffInMs = Date.parse(dueDate) - today.getTime();
  const diffInDays = Math.round(Math.abs(diffInMs / oneDay));

  if (diffInMs < 0) {
    return -1 * diffInDays;
  }

  return diffInDays;
};

export default CalculateDiffDate;
