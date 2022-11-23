import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
import fetchCountries from './fetchCountries'


const DEBOUNCE_DELAY = 300;
const body = document.querySelector('body')

const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfoCard = document.querySelector('.country-info');

searchBox.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY))
 
function onSearch(evt) {
    const name = evt.target.value.trim();
    countryList.innerHTML = '';
    countryInfoCard.innerHTML = '';

    if (!name) {
        return
    }

    fetchCountries(name).then(data => {
        if (data.length > 10) {
            return infoNotify();
        }
        if (data.length > 1 && data.length <= 10) {
            createCountryList(data);
            
        } else if (data.length = 1) {
            createCountryCard(data);
        }
    })
        .catch(err => errorNotify())
        
}

function createCountryList(arr) {
    const markupList = arr.map(item =>
        `<li class="list-county">
      <img src="${item.flags.svg}" alt="flag ${item.name}" width="50" height="30" />
      <h2 class="name-country">${item.name.official}</h2>
      </li>`).join('');
     
    countryList.innerHTML = markupList;
    
}

function createCountryCard(arr) {
    const markupCard = arr.map(item => 
      `<div class="card-county">
      <h2 class="name-country">${item.name.official}</h2>
      <p class="info-country"><b>Capital:</b> ${item.capital}</p>
      <p class="info-country"><b>Population:</b> ${item.population}</p>
      <p class="info-country"><b>Languages:</b> ${Object.values(item.languages)}</p>
      <img src="${item.flags.svg}" alt="flag ${item.name}" width="100" height="60"/>
      </div>`).join('');

    countryInfoCard.innerHTML = markupCard;

}

function infoNotify() {
    Notify.info("Too many matches found. Please enter a more specific name.");
}

function errorNotify() {
    Notify.failure("Oops, there is no country with that name.");
}

// styles
body.style.background = '#fafafa';
searchBox.style.borderRadius = '4px';
searchBox.style.background = '#f9f072';
countryList.style.listStyle = 'none';

