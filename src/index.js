import './css/styles.css';
import { fetchCountries } from './api/fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
const DEBOUNCE_DELAY = 300;

const searchInput = document.querySelector('#search-box')
const countryList = document.querySelector('.country-list')
const countryInfo = document.querySelector('.country-info')

searchInput.addEventListener('input', debounce(getCountryData, DEBOUNCE_DELAY))

function getCountryData(e) {
  const countryName = e.target.value.trim();
  cleanMarcup(countryList)
  cleanMarcup(countryInfo)
  if (!countryName) {
    return
  }
  fetchCountries(countryName)
    .then(data => {
      if (data.length === 1) {
        markUpCountry(data[0])
      } else if (data.length > 10) {
        Notiflix.Notify.success("Too many matches found. Please enter a more specific name.")
      } else {
        markUpCountries(data)
      }
    })
    .catch(err => {
      Notiflix.Notify.failure("Oops, there is no country with that name")
    })
}

function cleanMarcup(element) {
  element.innerHTML = '';
}

function markUpCountry(countryData) {
  console.log(countryData.name.official)
  const { flags, capital, population, name, languages } = countryData
  const language = Object.values(languages).join(', ')
  const { } = languages
  countryInfo.insertAdjacentHTML('beforeend',
    `<div class="bigList"><img src=${flags.svg} width = "175" alt = "flag" /><span>${name.official}</span></div>
  <ul><li class="list">Capital: ${capital}</li>
  <li class="list">Population: ${population}</li>
  <li class="list">Languages: ${language}</li></ul>
    `
  )
}

function markUpCountries(countryData) {
  countryData.map(country => {
    const { flags, name } = country;
    countryList.insertAdjacentHTML('beforeend',
    `<div class="list"><img src=${flags.svg} width = "30" /><span>${name.official}</span></div>`)
  })
}


