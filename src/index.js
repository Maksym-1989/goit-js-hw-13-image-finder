import './sass/main.scss';
import { error } from '@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

import { fetchDataImg } from './js/apiService';
import cardMarkup from './handlebars/photo-card.hbs';


const inputRef = document.querySelector('.js-input');
const submitButtonRef = document.querySelector('.button-form');
const ulRef = document.querySelector('.gallery');
const buttonMoreRef = document.querySelector('.btn-load-more');



submitButtonRef.addEventListener('click', renderFirstMarkup);

let pageNamber = 1;

function renderFirstMarkup(event) {
    event.preventDefault();
    pageNamber = 1;
    const inputValue = inputRef.value.trim();
    fetchDataImg(inputValue, pageNamber).then(data => {
        if (data.hits.length === 0) {
            error({ text: 'No matches found. Please try again'});
            return;
        }
        if (inputValue === '') {
            error({ text: 'Please enter image title'});
        }
        if (inputValue !== '') {
            ulRef.innerHTML = cardMarkup(data);
            buttonMoreRef.classList.remove('visually-hidden')
        }
    })
    .catch(err => {
        error({ text: 'Data base Error'});
    });
}

buttonMoreRef.addEventListener('click', renderNextMarkup);


function renderNextMarkup(event) {
    pageNamber += 1;
    const inputValue = inputRef.value.trim();
    fetchDataImg(inputValue, pageNamber).then(data => {
        if (event.target) {
            ulRef.insertAdjacentHTML('beforeend', cardMarkup(data));
        }
    })
    .catch(err => {
        error({ text: 'These are all images'});
    });
}

