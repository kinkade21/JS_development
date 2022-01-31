const title = "newProject";
const screens = "Простые, Сложные, Интерактивные";
const screenPrice = 1271;
const rollback = 67;
const fullPrice = 371458;
const adaptive = false;

console.log(typeof title, screens, screenPrice);
console.log(screens.length);
console.log("Стоимость вертски экранов", screenPrice, "рублей");
console.log("Стоимость разработки сайта", fullPrice, "рублей");
console.log(screens.toLowerCase().split(","));
console.log(fullPrice * (rollback/100), "рублей");