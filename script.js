'use strict'

let rollback = 67;
let title 
let screens 
let screenPrice 
let adaptive 
let service1
let service2
let allServicePrices
let fullPrice
let servicePercentPrice

const isNumber = function (num) {
  return !isNaN(parseFloat(num)) && isFinite(num)
}

const asking = function() {
  title = prompt('Как назывется ваш проект?');
  screens = prompt('Какие типы экранов нужно разработать?');

  do {
    screenPrice = prompt('Сколько будет стоить данная работа?');
  } while (!isNumber(screenPrice)) 

  adaptive = confirm('Нужен ли адаптив на сайте?');
}


const getAllServicePrices = function () {

  let sum = 0 

  for (let i = 0; i < 2; i++) {

    let price = 0

    if (i === 0) {
      service1 = prompt('Какой дополнительный тип услуги нужен?');
    } else if (i === 1) {
      service2 = prompt('Какой дополнительный тип услуги нужен?');
    }

    do {
      price = prompt('Сколько это будет стоить?')
    } while (!isNumber(price)) 

    sum += +price;
  }
  return sum
}

const showTypeOf = function (variable) {
  console.log(variable, typeof variable);
}

const getRollbackMassage = function (price) {
  if (price >= 30000) {
      return "Даем скидку в 10%"
  } else if (price >= 15000 && price <30000) {
      return "Даем скидку в 5%"
  } else if (price >= 0 && price < 15000) {
      return "Скидка не предусмотрена"
  } else {
      return "Что-то пошло  не так"
  }
}

const getFullPrice = function() {
  return +screenPrice + allServicePrices
}

const getTitle = function(str) {
  str = str.trim();
  return str.charAt(0).toUpperCase(0) + str.slice(1).toLowerCase();
}

const getServicePercentPrices = function() {
  return fullPrice - (fullPrice * (rollback / 100))
}
asking()
allServicePrices = getAllServicePrices();
fullPrice = getFullPrice();
servicePercentPrice = getServicePercentPrices();

showTypeOf(getTitle(title));
showTypeOf(screenPrice);
showTypeOf(adaptive);

console.log(getRollbackMassage(fullPrice));
console.log(servicePercentPrice, "рублей");
console.log(screens.length);
console.log("Стоимость верстки экранов " + screenPrice + " рублей" , " Стоимость разработки сайта" + fullPrice + " рублей");



