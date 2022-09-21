export const BASE_URL = 'https://restcountries.com/v3.1/name';

export const fetchCountries = url => {
    return fetch(
        `${BASE_URL}/${url}?fields=name,capital,population,flags,languages`
    )
        .then(r => {
          if (!r.ok) {
            throw new Error('No data loaded!');
          }
          return r.json();
    })
} 

