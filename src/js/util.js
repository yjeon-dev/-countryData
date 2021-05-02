/**
 * Helper object for working with countries data and extracting information.
 * See countries-data.js for format of the countries data set.
 */

// const { count } = require('yargs');

// eslint-disable-next-line no-unused-vars
const util = {
  /**
   * Given a language name, returns the 2-letter language code for this language.
   * Supports all of the following languages:
   *
   *  - English: "en"
   *  - Arabic: "ar"
   *  - Chinese: "zh"
   *  - French: "fr"
   *  - Hindi: "hi"
   *  - Korean: "ko"
   *  - Japanese: "ja"
   *  - Russian: "ru"
   *
   * If any other language is passed, return null
   *
   * For example:
   *
   * util.langCodeForLanguage('Korean') returns "ko"
   * util.langCodeForLanguage('German') returns null (i.e., not one of the supported languages)
   *
   * @param {String} language - the full language name
   */
  langCodeForLanguage(language) {
    if (language === 'English') {
      return 'en';
    } else if (language === 'Arabic') {
      return 'ar';
    } else if (language === 'Chinese') {
      return 'zh';
    } else if (language === 'French') {
      return 'fr';
    } else if (language === 'Hindi') {
      return 'hi';
    } else if (language === 'Korean') {
      return 'ko';
    } else if (language === 'Japanese') {
      return 'ja';
    } else if (language === 'Russian') {
      return 'ru';
    }
    return null;
  },

  /**
   * Formats a given number for display using the specified language.
   *
   * For example, given a number 652230 and language "Russian", return
   * the string:
   *
   * '652 230'
   *
   * Or if the language is "Hindi", return the string:
   *
   * '6,52,230'
   *
   * Your function should use util.langCodeForLanguage to map the language name to a language code.
   *
   * Use Intl.NumberFormat to generate the formatted numbers for each locale, see:
   *
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
   *
   * @param {Number} number - the number to format
   * @param {String} language - the language name to use
   */
  formatNumberForLanguage(number, language) {
    let smallLang = util.langCodeForLanguage(language);

    let formatter = new Intl.NumberFormat(smallLang);
    return formatter.format(number);
  },

  /**
   * Returns a copy of the given country Object with the name property switched
   * to the specified language, and numbers formatted for this language. For example,
   * if the following country object is passed:
   *
   * {
   *   code: 'AF',
   *   continent: 'Asia',
   *   areaInKm2: 652230,
   *   population: 35530081,
   *   capital: 'Kabul',
   *   name: {
   *     English: 'Afghanistan',
   *     Arabic: 'أفغانستان',
   *     Chinese: '阿富汗',
   *     French: 'Afghanistan',
   *     Hindi: 'अफ़ग़ानिस्तान',
   *     Korean: '아프가니스탄',
   *     Japanese: 'アフガニスタン',
   *     Russian: 'Афганистан'
   *   }
   * }
   *
   * And if the language parameter is "Korean", return the following new object:
   *
   * {
   *   code: 'AF',
   *   continent: 'Asia',
   *   areaInKm2: '652,230',
   *   population: '35,530,081'
   *   capital: 'Kabul',
   *   name: '아프가니스탄',
   * }
   *
   * NOTE: do not modify the original object.  Create and return a new one.
   *
   * You should support the following languages:
   *
   * English, Arabic, Chinese, French, Hindi, Korean, Japanese, Russian
   *
   * If any other language is passed, throw an error indicating that an unrecognized
   * language name was used.
   *
   * NOTE: you should call `util.formatNumberForLanguage` to format the areaInKm2
   * and population values for the given language.
   *
   * @param {Object} country - the country object to use
   * @param {String} language - the language name to use
   */
  countryForLanguage: function (country, language) {
    if (language in country.name) {
      let c = {
        code: country.code,
        continent: country.continent,
        areaInKm2: util.formatNumberForLanguage(country.areaInKm2, language),
        population: util.formatNumberForLanguage(country.population, language),
        capital: country.capital,
        name: ''
      };
      c.name = country.name[language];

      return c;
    }
    throw new Error('An unrecognized language name was used.');
  },

  /**
   * Return an array of all countries, with the `name` property replaced by the
   * appropriate translation, or English if not specified (or unknown).  For
   * example, when language="English", you would process the Object for Canada into:
   *
   * {
   *     code: "CA",
   *     continent: "Americas",
   *     areaInKm2: "9,984,670",
   *     population: "36,624,199",
   *     capital: "Ottawa",
   *     name: "Canada"
   * }
   *
   * Supported languages include:
   *
   * English, Arabic, Chinese, French, Hindi, Korean, Japanese, Russian
   *
   * Uses `countriesData` as the underlying array of countries to be processed
   * and `util.countryForLanguage`.
   *
   * @param {String} language - the language name to use
   */
  countriesByLanguage: function (language) {
    let result = [];
    for (let obj of window.countriesData) {
      let changed = util.countryForLanguage(obj, language);
      result.push(changed);
    }
    return result;
  },

  /**
   * Return an array of countries with a population greater than or equal to
   * `minPopulation`, and possibly less than equal to `maxPopulation` (if defined)
   * otherwise allow any number greater than `minPopulation`.
   *
   * Use `util.countriesByLanguage('English')` to get English names for countries
   * by default (i.e., you don't need to support multiple languages for population)
   *
   * @param {Number} minPopulation - (Required) minimum population value
   * @param {Number} maxPopulation - (Optional) maximum population value
   */
  countriesByPopulation: function (minPopulation, maxPopulation) {
    let result = [];
    let data = util.countriesByLanguage('English');
    for (let obj of data) {
      let pop = obj.population;
      for (let i = 0; i < pop.length; ) {
        if (pop[i] === ',') {
          pop = pop.replace(',', '');
        } else {
          i++;
        }
      }
      if (maxPopulation === undefined) {
        pop = parseInt(pop);
        if (pop >= minPopulation) {
          result.push(obj);
        }
      } else {
        pop = parseInt(pop);
        if (pop >= minPopulation && pop <= maxPopulation) {
          result.push(obj);
        }
      }
    }
    return result;
  },

  /**
   * Return an array of countries for the given `continent` with an area
   * greater than or equal to the given `area` in square KM.
   *
   * Use `util.countriesByLanguage('English')` to get English names for countries
   * by default (i.e., you don't need to support multiple languages for area)
   *
   * @param {String} continent - (Required) name of the continent (e.g., Europe)
   * @param {Number} minArea - (Required) minimum number of KM2 area
   */
  countriesByAreaAndContinent: function (continent, minArea) {
    let data = util.countriesByLanguage('English');

    let result = [];
    for (let obj of data) {
      if (obj.continent === continent) {
        let area = obj.areaInKm2;
        for (let i = 0; i < area.length; ) {
          if (area[i] === ',') {
            area = area.replace(',', '');
          } else {
            i++;
          }
        }
        if (area >= minArea) {
          result.push(obj);
        }
      }
    }
    return result;
  }
};
