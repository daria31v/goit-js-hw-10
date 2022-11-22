import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
import fetchCountries from './fetchCountries'


const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfoCard = document.querySelector('.country-info');

searchBox.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY))
 
function onSearch(evt) {
    
    const name = evt.target.value.trim().toLowerCase();
    console.log(name)

    if (!name) {
        alert('INPUT FALSE');
        return;
    }
    
    fetchCountries(name).then(data => {
        if (data.length > 10) {
            Notify.info("Too many matches found. Please enter a more specific name.");
        } else if (data.length <= 10 & data.length > 1) {
            createCountryList(data);
        } else if (data.length = 1) {
            createCountryCard(data);
        }
    }).catch(err => console.log(err))
    if (!evt.target.textContent) {
        clearList();
        clearCard();
            return
        }
}

function createCountryList(arr) {
    const markupList = arr.map(item =>
        `<li class="list-county">
      <img src="${item.flags.svg}" alt="flag ${item.name}" width="50" height="30" />
      <h2 class="name-country">${item.name.official}</h2>
      </li>`).join('');
    
    countryList.style.listStyle = 'none';

    countryList.innerHTML = markupList;
    
}

function createCountryCard(arr) {
    const markupCard = arr.map(item => 
      `<div class="card-county">
      <p class="name-country">${item.name.official}</p>
      <p class="info-country">Capital: ${item.capital}</p>
      <p class="info-country">Population: ${item.population}</p>
      <p class="info-country">Languages: ${Object.values(item.languages)}</p>
      <img src="${item.flags.svg}" alt="flag ${item.name}" width="100" height="60"/>
      </div>`).join('');

    countryInfoCard.innerHTML = markupCard;

}








// .then(data => {
//             if (data.length > 10) {
//                 Notify.info("Too many matches found. Please enter a more specific name.");
//             } else if (data.length <= 10 & data.length > 1) {
//                 createCountryList(data);
//             } else if (data.length = 1) {
//                 createCountryCard(data);
//             }
//         }).catch(err => console.log(err))
//     





    // const filteredItems = data.filter(t =>t..toLowerCase().includes(filter)
    // );

    // const listItemsMarkup = createCountryCard(filteredItems);
    // countryInfoCard.innerHTML = listItemsMarkup
   
    
//         .then(data => {
//             if (data.length > 10) {
//                 Notify.info("Too many matches found. Please enter a more specific name.");
//             } else if (data.length <= 10 & data.length > 1) {
//                 createCountryList(data);
//             } else if (data.length = 1) {
//                 createCountryCard(data);
//             }
//         }).catch(err => console.log(err))
//     if (!evt.textContent) {
//         clearList();
//         clearCard();
            // return
//         }









// 





// styles



//більше 10 відповідей - "Too many matches found. Please enter a more specific name."

// від 2 до 10 відповідей - створюєтьтся розмітка списку знайдених країн в ul

// якщо 1 відповідь відображається картка країни у div

// якщо країни не існує тоді повідомлення - "Oops, there is no country with that name"
// Не забувай про те, що fetch не вважає 404 помилкою, тому необхідно явно відхилити проміс, 
// щоб можна було зловити і обробити помилку.

 
// RENDER
// {
//         "name": "Afghanistan",
//         "capital": "Kabul",
//         "currencies":
