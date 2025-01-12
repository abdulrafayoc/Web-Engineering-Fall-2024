const temperatures = [];

function addTemperature(temp) {
  temperatures.push(temp);
}

function getHighestTemperature() {

  if (temperatures.length === 0) {
    return null;
  }
  let max = temperatures[0];
  for (let i = 1; i < temperatures.length; i++) {
    if (temperatures[i] > max) {
      max = temperatures[i];
    }
  }
  return max;
}

function getLowestTemperature() {
  if (temperatures.length === 0) {
    return null;
  }
  let min = temperatures[0];
  for (let i = 1; i < temperatures.length; i++) {
    if (temperatures[i] < min) {
      min = temperatures[i];
    }
  }
  return min;
}

function getAverageTemperature() {
  if (temperatures.length === 0) {
    return null;
  }
  let sum = 0;
  for (let i = 0; i < temperatures.length; i++) {
    sum += temperatures[i];
  }
  return sum / temperatures.length;
}

// Example usage
addTemperature(20);
addTemperature(22);
addTemperature(19);
addTemperature(25);
addTemperature(23);
addTemperature(21);
addTemperature(24);

console.log("Highest temperature:", getHighestTemperature());
console.log("Lowest temperature:", getLowestTemperature());
console.log("Average temperature:", getAverageTemperature());