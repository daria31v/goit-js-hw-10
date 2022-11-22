import { Notify } from 'notiflix/build/notiflix-notify-aio';

const BASE_URL = 'https://restcountries.com/v3.1/name/'
const fields = 'name,capital,population,languages,flags'


export default function fetchCountries(name) {
    
  return fetch(`${BASE_URL}${name}?fields=${fields}`)
       .then(response => {
        //    console.log(response)
           if (!response.ok) {
               Notify.failure("Oops, there is no country with that name")
               throw new Error(response.statusText)
           }
           return response.json()
           
       })
        .catch (err => console.error(err))
      
}