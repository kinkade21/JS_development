"use strict";

// перечень книг
const listBooks = [...document.querySelectorAll('.book')];
// body
const elBody = document.querySelector('body');
// реклама
const advertising = document.querySelector('.adv');
let newLi;

// сортировка перечня узлов по innerText и порядок их размещения в DOM
const compareNodeText = (a, b) => {
  const compare = (a, b) => (a < b ? -1 : a > b ? 1 : 0);
  const result = compare(a.innerText, b.innerText);

  if (result < 0) {
    b.before(a);
  } else if (result > 0) {
    b.after(a);
  }
  return result;
};

// восстановление порядка оглавления (введение и предисловие пропускаем)
const orderContents = (node) => {
  let listLi = [...node.querySelectorAll('li')];

  // отсекаем введение и предисловие
  listLi.splice(0, 2);
  // остальное оглавление сортируем
  listLi.sort(compareNodeText);
};


// восстановим порядок книг
listBooks.sort(compareNodeText);

// заменим картинку заднего фона на ./image/you-dont-know-js.jpg
elBody.style.backgroundImage = 'url(./image/you-dont-know-js.jpg)';

// исправить заголовок в книге 3 на "Книга 3. this и Прототипы Объектов"
listBooks[2].querySelector('a').innerText = "Книга 3. this и Прототипы Объектов";

// удалим рекламу
advertising.remove();

// восстановить порядок глав во второй и пятой книге
orderContents(listBooks[1]);
orderContents(listBooks[4]);

// в шестой книге добавить главу “Глава 8: За пределами ES6”
// и поставить её в правильное место
newLi = document.createElement('li');
newLi.innerText = "Глава 8: За пределами ES6";
listBooks[5].append(newLi);
orderContents(listBooks[5]);
