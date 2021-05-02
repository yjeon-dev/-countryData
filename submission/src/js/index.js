/* global  ui, util */

window.onload = function () {
  /**
   * Register click handlers for every menu item in the page.  Use the objects
   * and functions defined in the other JavaScript files to update/populate
   * the #table-rows table body with the appropriate set of countries, based on the
   * menu item clicked, specifically:
   *
   *  - countriesData array of country data Objects
   *  - util methods for working with the country data
   *  - ui methods for working with the DOM
   *
   * Make sure you also update the #subtitle heading to properly reflect what
   * is in the table after you populate it.
   *
   * For example: "List of Countries and Dependencies - Population between 1 and 2 million"
   * or "List of Countries and Dependencies - All countries in Asia" etc.
   */

  let heading = document.querySelector('#subtitle');
  let text = heading.textContent;

  let eng = document.querySelector('#menu_english');
  eng.addEventListener('click', () => {
    let countries = util.countriesByLanguage('English');
    ui.countriesToTable(countries, 'English');
    heading.textContent = text + ' | Language: English';
  });

  let arabic = document.querySelector('#menu_arabic');
  arabic.addEventListener('click', () => {
    let countries = util.countriesByLanguage('Arabic');
    ui.countriesToTable(countries, 'Arabic');
    heading.textContent = text + ' | Language: Arabic';
  });

  let chinese = document.querySelector('#menu_chinese');
  chinese.addEventListener('click', () => {
    let countries = util.countriesByLanguage('Chinese');
    ui.countriesToTable(countries, 'Chinese');
    heading.textContent = text + ' | Language: Chinese';
  });

  let french = document.querySelector('#menu_french');
  french.addEventListener('click', () => {
    let countries = util.countriesByLanguage('French');
    ui.countriesToTable(countries, 'French');
    heading.textContent = text + ' | Language: French';
  });

  let hindi = document.querySelector('#menu_hindi');
  hindi.addEventListener('click', () => {
    let countries = util.countriesByLanguage('Hindi');
    ui.countriesToTable(countries, 'Hindi');
    heading.textContent = text + ' | Language: Hindi';
  });

  let korean = document.querySelector('#menu_korean');
  korean.addEventListener('click', () => {
    let countries = util.countriesByLanguage('Korean');
    ui.countriesToTable(countries, 'Korean');
    heading.textContent = text + ' | Language: Korean';
  });

  let japanese = document.querySelector('#menu_japanese');
  japanese.addEventListener('click', () => {
    let countries = util.countriesByLanguage('Japanese');
    ui.countriesToTable(countries, 'Japanese');
    heading.textContent = text + ' | Language: Japanese';
  });

  let russian = document.querySelector('#menu_russian');
  russian.addEventListener('click', () => {
    let countries = util.countriesByLanguage('Russian');
    ui.countriesToTable(countries, 'Russian');
    heading.textContent = text + ' | Language: Russian';
  });

  let popUnderOneMillion = document.querySelector('#menu_population_100_000_000m');
  popUnderOneMillion.addEventListener('click', () => {
    let countries = util.countriesByPopulation(100000000);
    ui.countriesToTable(countries, 'English');
    heading.textContent = text + ' | based on population >100000000';
  });

  let popOverOneMillion = document.querySelector('#menu_population_1m_2m');
  popOverOneMillion.addEventListener('click', () => {
    let countries = util.countriesByPopulation(1000000, 2000000);
    ui.countriesToTable(countries, 'English');
    heading.textContent = text + ' | based on population between 1M ~ 2M';
  });

  let america = document.querySelector('#menu_americas_1mkm');
  america.addEventListener('click', () => {
    let countries = util.countriesByAreaAndContinent('Americas', 1000000);
    ui.countriesToTable(countries, 'English');
    heading.textContent = text + ' | based on area < 1000000 km2 in Americas';
  });

  let asiaAll = document.querySelector('#menu_asia_all');
  asiaAll.addEventListener('click', () => {
    let countries = util.countriesByAreaAndContinent('Asia', 0);
    ui.countriesToTable(countries, 'English');
    heading.textContent = text + ' | based on area of any size in Asia';
  });
};
