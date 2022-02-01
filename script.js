let title = "newProject";
let screens = "Простые, Сложные, Интерактивные";
let screenPrice = 1271;
let rollback = 67;
let fullPrice = 371458;
let adaptive = false;

console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);
console.log(screens.length);
console.log("Стоимость вертски экранов", screenPrice, "рублей");
console.log("Стоимость разработки сайта", fullPrice, "рублей");
console.log(screens.toLowerCase().split(","));
console.log(fullPrice * (rollback/100), "рублей");

title = prompt('Как назывется ваш проект?');
screens = prompt('Какие типы экранов нужно разработать?');
screenPrice = +prompt('Сколько будет стоить данная работа?');
adaptive = confirm('Нужен ли адаптив на сайте?');

let service1 = prompt('Какой дополнительный тип услуги нужен?');
let servicePrice1 = prompt('Сколько это будет стоить?');
let service2 = prompt('Какой дополнительный тип услуги нужен?');
let servicePrice2 = prompt('Сколько это будет стоить?');
fullPrice = screenPrice + servicePrice1 + servicePrice2;
let servicePercentPrice = fullPrice - rollback;
console.log(Math.ceil(servicePercentPrice));


switch (true) {
  case fullPrice > 30000:
    console.log('Даем скидку в 10%');
    break;
  case 15000 <= fullPrice <= 30000:
    console.log('Даем скидку в 5%');
    break;
  case 0 <= fullPrice < 15000:
    console.log('Скидка не предусмотрена');
    break;
  case  fullPrice < 0:
    console.log('Что-то пошло не так');
    break;
  
}







