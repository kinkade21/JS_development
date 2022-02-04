'use strict'

let rollback = 67;
let title = prompt('Как назывется ваш проект?');
let screens = prompt('Какие типы экранов нужно разработать?');
let screenPrice = +prompt('Сколько будет стоить данная работа?');
let adaptive = confirm('Нужен ли адаптив на сайте?');
let service1 = prompt('Какой дополнительный тип услуги нужен?');
let servicePrice1 = +prompt('Сколько это будет стоить?');
let service2 = prompt('Какой дополнительный тип услуги нужен?');
let servicePrice2 = +prompt('Сколько это будет стоить?');

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


const getAllServicePrices = function () {
  return servicePrice1 + servicePrice2
};

const getFullPrice = function () {
  return screenPrice + allServicePrices
}

const getTitle = function(str) {
  str = str.trim();
  return str.charAt(0).toUpperCase(0) + str.slice(1).toLowerCase();
}

const getServicePercentPrices = function () {
  return fullPrice - (fullPrice * (rollback / 100))
}

let allServicePrices = getAllServicePrices();
let fullPrice = getFullPrice();
let servicePercentPrice = getServicePercentPrices();

showTypeOf(getTitle(title))
showTypeOf(screenPrice)
showTypeOf(adaptive)

console.log(getRollbackMassage(fullPrice));
console.log(servicePercentPrice, "рублей");
console.log(screens.length);
console.log("Стоимость верстки экранов " + screenPrice + " рублей" , " Стоимость разработки сайта" + fullPrice + " рублей");




