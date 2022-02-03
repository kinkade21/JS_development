
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


function getAllServicePrices(s1, s2) {
  let allServicePrices = s1 + s2;
};

let fullPrice = function getFullPrice(sp, asp) {
  return  sp + asp;
};

title = function getTitle(str) {
  if (!str) return str;

  return str[0].toUpperCase() + str.slice(1);
}

let servicePercentPrice = function getServicePercentPrices(fp, rb) {
  return fp - (fp * (rb / 100))
}

getFullPrice(screenPrice, getAllServicePrices(service1, service2));
getTitle(title);

showTypeOf(title)
showTypeOf(screenPrice)
showTypeOf(adaptive)

console.log(getRollbackMassage(fullPrice));
console.log(getServicePercentPrices(fullPrice, rollback), "рублей");
console.log(screens.length);




