export const getDate = (date) => {
  const newDate = new Date(date);

  const day = newDate.getDate();
  const month = newDate.getMonth() + 1;
  const year = newDate.getFullYear();

  if (month < 10) {
    return `${day}/0${month}/${year}`;
  } else {
    return `${day}/${month}/${year}`;
  }
};

export const viewCardsForDates = (date, today) => {
  const dateCard = date.split("/");
  const dateA = dateCard.map((item) => parseInt(item));
  const todayDate = today.split("/");
  const dateB = todayDate.map((item) => parseInt(item));

  ///////////////////////////////
  // year
  if (dateA[2] > dateB[2]) return -1;
  if (dateA[2] < dateB[2]) return 1;

  // month
  if (dateA[1] < dateB[1]) return 1;
  if (dateA[1] > dateB[1]) return -1;
  // day
  if (dateA[0] < dateB[0]) return 1;
  if (dateA[0] > dateB[0]) return -1;

  return 0;
  ///////////////////////////////
};
