import React from "react"
import { IntlContextConsumer, changeLocale } from "gatsby-plugin-intl"

const languageName = {
  en: "EN",
  es: "ES",
}

const Language = () => {
  return (
    <div className="language">
      <IntlContextConsumer>
        {({ languages, language: currentLocale }) =>
          languages.map(language => (
            <button
              key={language}
              onClick={() => changeLocale(language)}
              className={currentLocale === language ? `active` : null}
            >
              {languageName[language]}
            </button>
          ))
        }
      </IntlContextConsumer>
    </div>
  )
}

export default Language
