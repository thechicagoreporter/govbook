import React from "react"
import { FormattedMessage, Link } from "gatsby-plugin-intl"

import Language from "./language"

const Header = () => (
  <header>
    <h1>
      <Link to="/">
        <FormattedMessage id="title" />
      </Link>
    </h1>
    <Language />
  </header>
)

export default Header
