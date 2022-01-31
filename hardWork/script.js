let num = 266219;

let array = num.toString().split("");
console.log(array);
array.forEach(numbers => {
  console.log(numbers);
});

let result = array.reduce(function (a , b) {
  return a * b;
});

console.log("Результат перемножения чисел массива=", result);
result = result ** 3;
console.log("Результат возведения в степень =", result);
console.log("Два первых числа=", result.toString().substring(0, 2));
