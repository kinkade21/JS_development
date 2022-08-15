"use strict";

// ссылки не элементы формы:
// - название проекта
const title = document.getElementsByTagName('h1')[0];
// - типы экранов для расчета, максимальное количество вариатнов, 
const screens = [...document.querySelectorAll('.screen')];
// - максимальное количество вариатнов типы экранов (0-приглашающий)
const maxScreens = screens[0].querySelector('select').length - 1;
// - шаблон пустого типа экрана
let templateScreen;

// - кнопка "+" под выпадающим списком
const buttonPlus = document.querySelector('.screen-btn');
// - кнопка "-" под выпадающим списком
let buttonMinus;

//  - дополнительные параметры: элемнеты-проценты и элемнеты-числa
const otherItemsPercent = document.querySelectorAll('.other-items.percent');
const otherItemsNumber = document.querySelectorAll('.other-items.number');
// - CMS (от англ. Content Management System) — система управления контентом сайта;
const cmsOpen = document.getElementById('cms-open');
const hiddenCmsVariants = document.querySelector('.hidden-cms-variants');

// - ранжированный ввод процента отката 
const inputRollback = document.querySelector('.rollback input');
// - елемент отображения текущего значение процента отката 
const inputRollbackValue = document.querySelector('.rollback .range-value');

// - кнопка "Рассчитать" и "Сброс"
const startBtn = document.getElementsByClassName('handler_btn')[0];
const resetBtn = document.getElementsByClassName('handler_btn')[1];

// - елементы отображения итогов
const total = document.getElementsByClassName('total-input')[0];
const totalCount = document.getElementsByClassName('total-input')[1];
const totalCountOther = document.getElementsByClassName('total-input')[2];
const fullTotalCount = document.getElementsByClassName('total-input')[3];
const totalCountRollback = document.getElementsByClassName('total-input')[4];

// калькуляция разработки сайта
const appData = {

  // типы экранов в проекте и их цены
  screens: [],
  // максимальное число одного типа экрана
  maxTypeScreens: 100000,

  // статусЫ состояния расчета
  status: {
    calculated: false,
    screens: false,
    inputCMS: false
  },

  // дополнительные услуги: проценты и их цены
  servicesPercent: {},
  servicesNumber: {},

  // стоимость работ по верстке экранов
  screenPrice: 0,
  // количество экранов к верстке
  screenCount: 0,

  // итого стоимость дополнительных услуг (итоговый % и сумма)
  servicePricesPercent: 0,
  servicePricesNumber: 0,

  // проценты и сумма за CMS
  percentCMS: 0,
  maxPercentCMS: 100,
  servicePriceCMS: 0,

  // итоговая стоимость работы
  fullPrice: 0,
  // % отката посреднику
  rollback: 0,
  // доход разработчика
  servicePercentPrice: 0,

  // проверяет на запись числа в строке:
  // целая часть - не более int-разрядов (по умолчанию 9), 
  // дробная часть 0 или от 1 до 2 разрядов с разделителем: точка или запятая
  isNumber: (input, int = 9, dec = 2) => {
    const regexp = new RegExp(`(^0$)` +
      (dec > 0 ? `|(^0(\\.|,)\\d{0,${dec - 1}}\\d$)` : ``) +
      `|(^[1-9]\\d{0,${1, int - 1}}$)` +
      (dec > 0 ? `|(^[1-9]\\d{0,${1, int - 1}}(\\.|,)\\d{0,${dec - 1}}\\d$)` : ``));

    return regexp.test((input + '').trim());
  },

  // перевод числа из строки ввода в число
  toNumber: (strInput) => +(strInput.replace(/[,]/g, '.').trim()),


  // инициализация
  init() {
    // устанавливаем начальные настройки страницы
    this.initPage();

    // добавить дополнительный тип экрана к расчету по нажатию кнопки "+"    
    buttonPlus.addEventListener('click', () => this.addScreenBlock());
    // удалить последний дополнительный тип экрана к расчету по нажатию кнопки "-"
    buttonMinus.addEventListener('click', () => this.delScreenBlock());
    // выбор процента отката
    inputRollback.addEventListener('input', (event) => this.getRollback(event));
    // расчет по нажатию кнопки "Рассчитать"
    startBtn.addEventListener('click', () => this.calculate());
    // сброс по нажатию кнопки "Сброс"
    resetBtn.addEventListener('click', () => this.cleaning());
    // доступ к выбору CMS-варинтов
    cmsOpen.addEventListener('change', (event) => this.checkCMS(event));
    // выбор CMS-варинта
    hiddenCmsVariants.addEventListener('change', (event) => this.selectCMS(event));
  },

  // начальные настройки страницы
  initPage() {
    const input = screens[0].querySelector('input'),
      select = screens[0].querySelector('select'),
      selectCMS = hiddenCmsVariants.querySelector('select'),
      inputCMS = hiddenCmsVariants.querySelector('input'),
      spanCMS = document.createElement('span');

    // устанавка названия страницы 
    document.title = title.textContent;

    // напоминание заполняющему
    document.querySelector('h3').innerHTML +=
      '<br /><small><i>поля тип и количество экранов обязательны для заполнения' +
      '<br />количество экранов не более ' + this.maxTypeScreens + '</i></small>';

    // вносим изменения в настройки полей типа экранов    
    input.setAttribute('type', 'number');
    input.setAttribute('min', '0');
    input.setAttribute('max', this.maxTypeScreens + '');
    input.appThis = this;
    input.setAttribute('onchange', 'this.appThis.reachStartBtn()');
    select.appThis = this;
    select.setAttribute('onchange', 'this.appThis.reachStartBtn()');
    [...document.querySelectorAll('.element input.custom-checkbox')].forEach(elem => {
      elem.appThis = this;
      elem.setAttribute('onchange', 'this.appThis.checkServices()');
    });

    // шаблон пустого типа экрана
    templateScreen = screens[0].cloneNode(true);

    // добавим кнопочку "-" под выпадающим списком
    buttonMinus = buttonPlus.cloneNode();
    buttonMinus.textContent = '-';
    buttonMinus.style.marginLeft = '5px';
    buttonPlus.after(buttonMinus);

    // вывод пояснения при вводе процентов CMS для типа "Другое"
    spanCMS.innerHTML = `<br /><small>(число от 0 до ${this.maxPercentCMS})</small>`;
    inputCMS.parentElement.append(spanCMS);

    // и дополняем атрибутами
    selectCMS.appThis = this;
    selectCMS.setAttribute('onchange', 'this.appThis.reachStartBtn()');
    inputCMS.appThis = this;
    inputCMS.setAttribute('onchange', 'this.appThis.reachStartBtn()');

    // доступность кнопки "Рассчитать"
    this.reachStartBtn();
    // состояние кнопочек изменения количества типов экрана
    this.statusScreensButton();
  },

  // доступность кнопки "Рассчитать"
  reachStartBtn() {
    let reach;

    // состояние блоков типов экрана
    this.statusScreens();
    reach = this.status.screens;

    // проверка корректного ввода %CMS при типе "прочее"
    this.statusCMS();
    if (reach) {
      reach = this.status.inputCMS;
    }

    startBtn.disabled = !reach;
    startBtn.style.opacity = reach ? '' : '0.5';
    startBtn.style.cursor = reach ? '' : 'default';
  },

  // добавляем дополнительный тип экрана к расчету
  addScreenBlock() {
    let cloneScreen;

    if (screens.length < maxScreens) {
      // - копия первого элемента коллекции screens c контекстом для onchange
      cloneScreen = templateScreen.cloneNode(true);
      cloneScreen.querySelector('input').appThis = this;
      cloneScreen.querySelector('select').appThis = this;

      // вставляем клон после последнего элемента в screens     
      screens[screens.length - 1].after(cloneScreen);

      // SGVarr  добавляем в список для правильного отображения и вставки - может позже будут добавлять? 
      screens.push(cloneScreen);

      // доступность кнопки "Рассчитать"
      this.reachStartBtn();
      // состояние кнопочек изменения количества типов экрана 
      this.statusScreensButton();
    }
  },

  // удаляем последний дополнительный тип экрана к расчету
  delScreenBlock() {
    if (screens.length > 1) {
      screens[screens.length - 1].remove();
      screens.length--;

      // доступность кнопки "Рассчитать"
      this.reachStartBtn();
      // состояние кнопочек изменения количества типов экрана 
      this.statusScreensButton();
    }
  },

  // состояние блоков типов экрана
  statusScreens() {
    // наличие незаполненных (некорректно заполненных) полей
    let correct = true;

    screens.forEach((screen, index) => {
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');
      const calculated = this.status.calculated;

      select.disabled = calculated;
      select.style.cursor = calculated ? 'default' : '';
      input.disabled = calculated;
      input.style.cursor = calculated ? 'default' : '';

      if (!calculated) {
        const value = +input.value;
        const noSelect = !select.selectedIndex;
        const noInput = !value || value < 1 || value > this.maxTypeScreens;

        select.style.backgroundColor = noSelect ? 'MistyRose' : '';
        input.style.backgroundColor = noInput ? 'MistyRose' : '';

        if (noSelect || noInput) { correct = false; }
      }
      this.status.screens = correct;
    });
  },

  // состояние кнопок изменения количества типа экрана
  statusScreensButton() {
    const noPlus = (screens.length === maxScreens || this.status.calculated);
    const noMinus = (screens.length === 1 || this.status.calculated);

    // [де]активация кнопки добавления типов экрана
    buttonPlus.disabled = noPlus;
    buttonPlus.style.opacity = noPlus ? '0.5' : '1';
    buttonPlus.style.cursor = noPlus ? 'default' : '';

    // [де]активация кнопки удаления типов экрана
    buttonMinus.disabled = noMinus;
    buttonMinus.style.opacity = noMinus ? '0.5' : '1';
    buttonMinus.style.cursor = noMinus ? 'default' : '';
  },

  // состояние блоков CMS
  statusCMS() {
    const calculated = this.status.calculated,
      select = hiddenCmsVariants.querySelector('select'),
      input = hiddenCmsVariants.querySelector('input');
    const correct = (() => {
      let valid = true;
      if (cmsOpen.checked && select.options[select.selectedIndex].value === 'other') {
        valid = input.value.trim() === '' ||
          (this.isNumber(input.value, 3, 0) && input.value >= 0 && input.value <= this.maxPercentCMS);
      }
      return valid;
    })();

    select.disabled = calculated;
    select.style.cursor = calculated ? 'default' : '';
    input.disabled = calculated;
    input.style.cursor = calculated ? 'default' : '';
    input.style.backgroundColor = correct ? '' : 'MistyRose';

    this.status.inputCMS = correct;
  },

  // выбор дополнительных услуг
  checkServices() {
    // при произведенном расчете выполняем уточнение рассчета
    if (this.status.calculated) { this.start(); }
  },

  // доступ к выбору CMS-варинтов
  checkCMS(event) {
    if (event.target.checked) {
      hiddenCmsVariants.style.display = 'flex';
    } else {
      hiddenCmsVariants.style.display = 'none';
    }

    // при произведенном расчете выполняем уточнение рассчета
    if (this.status.calculated) {
      // состояние блоков CMS
      this.statusCMS();
      if (this.status.inputCMS) { this.start(); }

    } else {
      // доступность кнопки "Рассчитать"
      this.reachStartBtn();
    }
  },

  // очистка выбора CMS-варинта
  delCMS() {
    // спрячем
    cmsOpen.checked = false;
    hiddenCmsVariants.style.display = 'none';

    // и почистим 
    hiddenCmsVariants.querySelector('select').selectedIndex = 0;
    hiddenCmsVariants.querySelector('.main-controls__input').style.display = 'none';
    hiddenCmsVariants.querySelector('input').value = '';

    // очищаем процент СМS
    this.percentCMS = 0;
  },

  // выбор CMS-варинта
  selectCMS(event) {
    const block = event.currentTarget;
    const select = event.target;

    // выбор типа CMS
    if (select.id === "cms-select") {
      block.querySelector('.main-controls__input').style.display =
        (select.value === 'other') ? 'block' : 'none';
    }
  },

  // выбор процента отката
  getRollback(event) {
    this.rollback = event.target.value;
    // отображения текущего значение процента отката 
    this.showInputRollback();

    // при произведенном расчете меняем откат 
    if (this.status.calculated) { this.start(); }
  },

  // очистка процента отката
  delRollback() {
    this.rollback = 0;
    inputRollback.value = 0;
    // отображения текущего значение процента отката 
    this.showInputRollback();
  },

  // отображения текущего значение процента отката 
  showInputRollback() {
    // елемент отображения текущего значение процента отката 
    inputRollbackValue.textContent = this.rollback + '%';
  },

  // расчет по нажатию кнопки "Рассчитать"
  calculate() {
    // запуска расчета
    this.start();

    // устанавливаем признак расчета
    this.status.calculated = true;

    // состояние блоков типов экрана
    this.statusScreens();
    // состояние кнопок изменения количества типа экрана
    this.statusScreensButton();
    // состояние блоков CMS
    this.statusCMS();

    // убираем кнопку "Рассчет" ставим кнопку "Сброс"
    startBtn.style.display = 'none';
    resetBtn.style.display = '';
  },

  // очистка по нажатию кнопки "Сброс"
  cleaning() {

    // возврат к первоначальному состоянию
    this.reset();

    // снимаем признак расчета
    this.status.calculated = false;

    // доступность кнопки "Рассчитать"
    this.reachStartBtn();
    // состояние кнопок изменения количества типа экрана
    this.statusScreensButton();
    // состояние блоков CMS
    this.statusCMS();

    // убираем кнопку "Сброс" ставим кнопку "Рассчет"
    resetBtn.style.display = 'none';
    startBtn.style.display = '';


  },

  // запуск расчета
  start() {
    // перечень типов экранов для расчета
    this.addScreens();
    // значения дополнительных параметров для расчета
    this.addServices();
    // процент за CMS
    this.addPercentCMS();
    // расчет итоговых стоимостей экранов, дополнительных услуг, доход разработчика
    this.addPrices();
    // вывод результатов расчетов на экран
    this.showResult();
  },

  // возврат к первоначальному состоянию
  reset() {
    // удаляем перечень типов экрана для расчета из верстки
    this.delScreens();
    // очищаем дополнительные параметры для расчета 
    this.delServices();
    // очистка выбора CMS-варинта
    this.delCMS();
    // очистка процента отката
    this.delRollback();
    // очистка итоговых стоимостей экранов, дополнительных услуг и доход разработчика
    this.delPrices();
    // вывод результатов расчетов на экран
    this.showResult();
  },

  // считываем перечень типов экрана для расчета из верстки
  addScreens() {
    // очистим перед обновлением
    this.screens.length = 0;

    screens.forEach((screen, index) => {
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');
      // название типа (из списка типов по индексу выбранного типа select.selectedIndex)
      const selectName = select.options[select.selectedIndex].textContent;

      this.screens.push({
        id: index,
        name: selectName,
        price: +select.value * +input.value,
        count: +input.value,
      });
    });
  },


  // удаляем перечень типов экрана для расчета из верстки
  delScreens() {
    screens.forEach((screen, index) => {
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');
      // название типа (из списка типов по индексу выбранного типа select.selectedIndex)
      const selectName = select.options[select.selectedIndex].textContent;
      if (index) {
        // удаляем добавленные
        screen.remove();
      } else {
        // для первого снимаем выбор
        select.selectedIndex = 0;
        input.value = '';
      }
    });

    screens.length = 1;
    this.screens.length = 0;

  },

  // считываем дополнительные параметры для расчета 
  addServices() {
    const add = (item, typeValue) => {
      // флажок (чекбокс) учитывать или нет параметр в расчетах
      const check = item.querySelector('input[type=checkbox]');
      // название и значение параметра
      const label = item.querySelector('label');
      const input = item.querySelector('input[type=text]');

      // запоминаем значения по выбранным дополнительным услугам
      this['services' + typeValue][label.textContent] = (check.checked) ? +input.value : 0;
    };

    // значения-проценты
    otherItemsPercent.forEach(item => add(item, 'Percent'));
    // значения-числa    
    otherItemsNumber.forEach(item => add(item, 'Number'));
  },

  // очищаем дополнительные параметры для расчета 
  delServices() {
    const clear = (item, typeValue) => {
      // флажок (чекбокс) учитывать или нет параметр в расчетах
      const check = item.querySelector('input[type=checkbox]');

      // очищаем значения по дополнительным услугам
      check.checked = false;
    };

    // значения-проценты
    otherItemsPercent.forEach(item => clear(item, 'Percent'));
    // значения-числa    
    otherItemsNumber.forEach(item => clear(item, 'Number'));

    this.servicesPercent.length = 0;
    this.servicesNumber.length = 0;
  },

  // процент за CMS
  addPercentCMS() {
    const select = hiddenCmsVariants.querySelector('select');
    const input = hiddenCmsVariants.querySelector('input');

    let value = '0';
    if (cmsOpen.checked) {
      value = select.options[select.selectedIndex].value;
      if (value === 'other') { value = input.value; }
    }

    this.percentCMS = +value;
  },

  // расчет итоговых стоимостей экранов, дополнительных услуг и доход разработчика
  addPrices() {
    // итоговая стоимость экранов
    this.screenPrice = this.screens.reduce((sum, screen) => sum + screen.price, 0);
    // итоговое количество экранов
    this.screenCount = this.screens.reduce((quantity, screen) => quantity + screen.count, 0);

    // итоговая стоимость дополнительных услуг заданных в процентах    
    this.servicePricesPercent = 0;
    for (let key in this.servicesPercent) {
      this.servicePricesPercent += this.screenPrice * this.servicesPercent[key] / 100;
    }

    // итоговая стоимость дополнительных услуг заданных в суммах    
    this.servicePricesNumber = 0;
    for (let key in this.servicesNumber) {
      this.servicePricesNumber += this.servicesNumber[key];
    }

    // итоговая стоимость работы
    this.fullPrice = this.screenPrice + this.servicePricesPercent + this.servicePricesNumber;

    // c доплатой за CMS (без отображения)
    this.servicePriceCMS = Math.round(this.fullPrice * this.percentCMS / 100);
    this.fullPrice += this.servicePriceCMS;

    // расчет итоговой стоимости за вычетом отката
    // (итоговая стоимость уменьшенная на сумму отката посреднику, округленная в большую сторону )
    this.servicePercentPrice = Math.ceil(this.fullPrice * (100 - this.rollback) / 100);
  },

  // очистка итоговых стоимостей
  delPrices() {
    this.screenPrice = 0;
    this.screenCount = 0;
    this.servicePricesPercent = 0;
    this.servicePricesNumber = 0;
    this.servicePriceCMS = 0;
    this.fullPrice = 0;
    this.servicePercentPrice = 0;
  },

  // вывод результатов расчетов на экран
  showResult() {
    // - елементы отображения итогов
    total.value = this.screenPrice;
    totalCount.value = this.screenCount;
    totalCountOther.value = this.servicePricesPercent + this.servicePricesNumber;
    fullTotalCount.value = this.fullPrice;
    totalCountRollback.value = this.servicePercentPrice;
  }

};

// калькулирование стоимости разработки сайта
appData.init();