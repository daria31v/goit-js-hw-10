import { Notify } from 'notiflix/build/notiflix-notify-aio';

const BASE_URL = 'https://restcountries.com/v3.1/name/'
const fields = 'name,capital,population,languages,flags'


export default function fetchCountries(name) {
    
  return fetch(`${BASE_URL}${name}?fields=${fields}`)
    .then(response => {
      if (!response.ok) {
      throw new Error('404')
    }
      return response.json()
           
    })
    .catch(err => console.error(err))
    
  };
      
     
