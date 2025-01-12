// 1. Capitalize Words

function capitalizeWords(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" "); 
}

console.log(capitalizeWords("hello world")); // Expected: "Hello World"

// 2. Even or Odd

function isEvenOrOdd(num) {
  if (num % 2 === 0) {
    return "Even";
  } else {
    return "Odd";
  }
}

console.log(isEvenOrOdd(4)); // Expected: "Even"
console.log(isEvenOrOdd(3)); // Expected: "Odd"

// 3. Find Character Index

const findCharacterIndex = (str, char) => {
  for (let i = 0; i < str.length; i++) {
    if (str[i] === char) {
      return i;
    }
  }
  return -1;
};

console.log(findCharacterIndex("hello", "e")); // Expected: 1

// 4. Print Age

const person = {
  name: "John",
  age: 30,
};

const printAge = function (person) {
  console.log(person.age); 
};

printAge(person); // Expected: 30