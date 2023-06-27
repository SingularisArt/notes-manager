const DisplayDate = (dueDate: string) => {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const monthsOfYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dateParts = dueDate.split("-");
  const year = dateParts[0];
  const month = monthsOfYear[parseInt(dateParts[1]) - 1];
  const dayOfMonth = parseInt(dateParts[2]);

  const dateObj = new Date(dueDate);
  const dayOfWeek = daysOfWeek[dateObj.getDay()];

  const today = new Date();
  const timeDiff = Math.abs(dateObj.getTime() - today.getTime());
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
  const daysRemaining =
    daysDiff == 1
      ? `${daysDiff} day remaining`
      : daysDiff > 1
        ? `${daysDiff} days remaining`
        : "";

  const suffix = (() => {
    switch (dayOfMonth) {
      case 1:
      case 21:
      case 31:
        return "st";
      case 2:
      case 22:
        return "nd";
      case 3:
      case 23:
        return "rd";
      default:
        return "th";
    }
  })();

  return `${month} ${dayOfMonth}${suffix}, ${dayOfWeek}, ${year} (${daysRemaining})`;
};

export default DisplayDate;
