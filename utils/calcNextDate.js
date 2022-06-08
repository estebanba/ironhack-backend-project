function calcNextDate(stringDate, timeWindowsNumber) {
  const date = new Date (stringDate)
  let epochNumber = date.setDate(date.getDate() + timeWindowsNumber);
  let dateNumber = new Date (epochNumber)
  let nextDate = dateNumber.toLocaleString().slice(0, 10).split("/").reverse().join("-")
  return nextDate;
}

module.exports = calcNextDate;
