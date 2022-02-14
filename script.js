"use strict";

const appData = {
  title: "Калькулятор верстки",
  screens: [],
  screenPrice: 0,
  rollback: 67,
  allServicePrices: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  services: {},
  

  start: function () {
    appData.asking();
    appData.addPrices();
    appData.getFullPrice();
    appData.getServicePercentPrices();
    appData.getTitle();
    appData.logger();
  },
  // проверка валидности строки текста
  isValidText: (str) => {
    const regstr = /^[А-Яа-яA-Za-z0-9]+$/,
      regnum = /^[0-9]+$/;

    // удаляем все пробельные символы из строки
    str = str.replace(/\s+/g, '');
    return regstr.test(str) && !regnum.test(str);
  },

  // перевод строки текста в валидный
  toValidText: (str) => {
    // убираем начальные и конечные пробелы и конвертируем 2 и более пробелов в 1
    return str.trim().replace(/\s{2,}/g, " ");
  },


  isNumber: function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
  },

  toNumber: (strInput) => +(strInput.replace(/[,]/g, '.').trim()),

  asking: () => {
    let title = appData.title,
      screens = appData.screens,
      screenPrice = appData.screenPrice;

    do {
      title = prompt('Как называется Ваш проект ?', title) || '';
    } while (!appData.isValidText(title));
    appData.title = appData.toValidText(title);

    for (let i = 0; i < 2; i++) {
      let name = 'Экран ' + (i + 1), price = '0';

      do {
        name = prompt('Какой тип экрана нужно разработать?', name) || '';
      } while (!appData.isValidText(name));
      name = appData.toValidText(name);

      do {
        price = prompt(`Сколько будет стоить разработка типа экрана: ${name}?`, price || '');
      } while (!appData.isNumber(price));
      price = appData.toNumber(price);

      appData.screens.push({id: i, name: name, price: price});
    }

    for (let i = 0; i < 2; i++) {
      let name = 'услуга', price = '0';

      do {
        name = prompt('Какой дополнительный тип услуги нужен?:', name) || '';
      } while (!appData.isValidText(name));
      name = (i + 1) + ') ' + appData.toValidText(name);

      do {
        price = prompt(`Сколько будет стоить: ${name}?`, price || '');
      } while (!appData.isNumber(price));
      price = appData.toNumber(price);

      appData.services[name] = price;
    }

    appData.adaptive = confirm('Нужен ли адаптив на сайте?');

  },

    addPrices: function() {
    appData.screenPrice = appData.screens.reduce((sum, screen) => sum + screen.price, 0);

    for (let key in appData.services) {
      appData.allServicePrices += appData.services[key]
    }
  },

  getFullPrice: function () {
    appData.fullPrice =  +appData.screenPrice + appData.allServicePrices;
  },

  getServicePercentPrices: function () {
    appData.servicePercentPrice =  appData.fullPrice - (appData.fullPrice * (appData.rollback / 100)) 
  },

  getTitle: function () {
    appData.title =  appData.title.trim()[0].toUpperCase() + appData.title.trim().substr(1).toLowerCase()
  },

  getRollbackMessage: function (price) {
    if (price >= 30000) {
      return "Даём скидку в 10%";
    } else if (price >= 15000 && price < 30000) {
      return "Даем скидку в 5%";
    } else if (price < 15000 && price >= 0) {
      return "Скидка не предусмотрена";
    } else {
      return "Что то пошло не так";
    }
  },

  logger: function () {
    console.log(appData.fullPrice);
    console.log(appData.servicePercentPrice);
    console.log(appData.screens);
  },
};

appData.start();