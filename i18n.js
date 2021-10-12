
module.exports = {
  loadLocaleFrom: (lang, ns) =>
  // You can use a dynamic import, fetch, whatever. You should
  // return a Promise with the JSON file.
  import(`./src/locales/${lang}/${ns}.json`).then((m) => m.default),
  locales: ['en', /*'hi', 'ru', 'de', 'es', 'fr', 'it', 'ko', 'ar', 'ja' */],
  localesMap: {
      en: {
        countryCode: "US"
      },
      ru: {
        countryCode: "ru"
      },
      de: {
        countryCode: "de"
      },
      es: {
        countryCode: "es"
      },
      fr: {
        countryCode: "fr"
      },
      it: {
        countryCode: "it"
      },
      ko: {
        countryCode: "kr"
      },
      ar: {
        countryCode: "ae",
        isRTL: true
      },
      hi: {
        countryCode: "in"
      },
      ja: {
        countryCode: "jp"
      },
  },

  defaultLocale: 'en',
  pages: {
    "*": ["common", "header", "footer"],
    "/": ["home"],
    "/swap": ["swap", "swap-helpers"],
    "/swap-helpers": ["swap-helpers"],
    "/[username]": ["trader"],
    "/register": ["reg"],
    "/dashboard": ["dash"],
    "/404": ["error"],
  }
}