'use strict'

let rollback = 67;
let title = prompt('Как назывется ваш проект?');
let screens = prompt('Какие типы экранов нужно разработать?');
let screenPrice = +prompt('Сколько будет стоить данная работа?');
let adaptive = confirm('Нужен ли адаптив на сайте?');
let service1 = prompt('Какой дополнительный тип услуги нужен?');
let servicePrice1 = prompt('Сколько это будет стоить?');
let service2 = prompt('Какой дополнительный тип услуги нужен?');
let servicePrice2 = prompt('Сколько это будет стоить?');

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


const getAllServicePrices = (sp1, sp2) => {
  return sp1 + sp2;
};

function getFullPrice(sp, asp) {
  return sp + asp;
}

const getTitle = function(str) {
  str = str.trim();
  return str.charAt(0).toUpperCase(0) + str.slice(1).toLowerCase();
}

const getServicePercentPrices = function(fp, rb) {
  return fp - (fp * (rb / 100))
}

let allServicePrices = getAllServicePrices(servicePrice1, servicePrice2);
let fullPrice = getFullPrice(screenPrice, allServicePrices);
let servicePercentPrice = getServicePercentPrices(fullPrice, rollback);

showTypeOf(getTitle(title))
showTypeOf(screenPrice)
showTypeOf(adaptive)

console.log(getRollbackMassage(fullPrice));
console.log(getServicePercentPrices(fullPrice, rollback), "рублей");
console.log(screens.length);




