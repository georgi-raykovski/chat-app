const oneMinute = 60 * 1000;

export const areDatesOneMinuteApart = (firstDate: Date, secondDate: Date): boolean => {
  // Get the difference in milliseconds between the two dates
  const timeDifference = Math.abs(firstDate.getTime() - secondDate.getTime());
  // Check if the time difference is less than or equal to 1 minute (60 seconds * 1000 milliseconds)
  const isOneMinuteApart = timeDifference >= oneMinute;

  return isOneMinuteApart;
};
