import { BooksObject, bar } from '../modules/BooksObject.js';
import { DateTime } from '../luxon/luxon/build/es6/luxon.js';

const booklist = new BooksObject();
const now = DateTime.now();
document.addEventListener('DOMContentLoaded', () => {
  window.onload = () => {
    if (localStorage) {
      const localStorageItem = localStorage.getItem('booklist');
      booklist.loadbooks(JSON.parse(localStorageItem));
    }
    const datetime = document.getElementById('date-time');
    datetime.innerHTML = bar;
    datetime.innerHTML += `<p>${now.toLocaleString(DateTime.DATETIME_MED)}</p>`;
    const removebooksection = document.getElementById('removebookstable');
    for (let i = 0; i < booklist.booklist.length; i += 1) {
      let bookhtml;
      if (i % 2 === 1) {
        bookhtml = `<tr class="greyrow"><th><p>"${booklist.booklist[i].title}" by "${booklist.booklist[i].author}</p></th><th><form id="removebook${i}"><button class="removebutton" id="removebookbutton${i}" type="button">remove</button></form></th></tr>`;
      } else {
        bookhtml = `<tr><th><p>"${booklist.booklist[i].title}" by "${booklist.booklist[i].author}</p></th><th><form id="removebook${i}"><button class="removebutton" id="removebookbutton${i}" type="button">remove</button></form></th></tr>`;
      }
      removebooksection.innerHTML += bookhtml;
    }
    for (let j = 0; j < booklist.booklist.length; j += 1) {
      const removebutton = `#removebookbutton${j}`;
      document.querySelector(removebutton).addEventListener('click', () => {
        const prefix = removebutton[17];
        booklist.removeBook(prefix);
      });
    }
  };

  window.addEventListener('beforeunload', () => {
    localStorage.setItem('booklist', JSON.stringify(booklist));
  });

  document.querySelector('#addbookbutton').addEventListener('click', () => {
    if (document.getElementById('titlename').value !== '' && document.getElementById('authorname').value !== '') {
      booklist.addBook(document.getElementById('titlename').value, document.getElementById('authorname').value);
    }
  });

  document.querySelector('#listbutton').addEventListener('click', () => {
    document.querySelector('#removebooks').classList.remove('inactive');
    document.querySelector('#addbooks').classList.add('inactive');
    document.querySelector('#contactsection').classList.add('inactive');
  });

  document.querySelector('#addnewnavbutton').addEventListener('click', () => {
    document.querySelector('#removebooks').classList.add('inactive');
    document.querySelector('#addbooks').classList.remove('inactive');
    document.querySelector('#contactsection').classList.add('inactive');
  });

  document.querySelector('#contactbutton').addEventListener('click', () => {
    document.querySelector('#removebooks').classList.add('inactive');
    document.querySelector('#addbooks').classList.add('inactive');
    document.querySelector('#contactsection').classList.remove('inactive');
  });
});