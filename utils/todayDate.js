// let waterButton = document.getElementById('btn-watering');

const setWaterDate = (lastWatering, nextWatering) => {
  nextWatering = Date.getDay(lastWatering) + wateringWeekly;
  return nextWatering;
}

module.exports = { setWaterDate };

