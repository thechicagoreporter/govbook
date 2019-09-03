/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { FormattedMessage } from "gatsby-plugin-intl"

function UnitName({ intl, UnitName, Description, fields }) {
  switch (fields.categorySlug) {
    case "city":
    case "village":
    case "township":
      return <h1>
          <FormattedMessage
            id={`unitLabels.${fields.categorySlug}`}
            values={{ UnitName }}
          />
        </h1>
    default:
      return <h1>{UnitName} {Description}</h1>
  }
}

export default UnitName

