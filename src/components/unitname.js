/**
 * Format a unit's name
 */

import React from "react"
import { FormattedMessage } from "gatsby-plugin-intl"

function UnitName({ intl, UnitName, Description, fields }) {
  switch (fields.categorySlug) {
    case "city":
    case "village":
    case "township":
      return <span>
          <FormattedMessage
            id={`unitLabels.${fields.categorySlug}`}
            values={{ UnitName }}
          />
        </span>
    case "community-college":
      return <span>{UnitName}</span>
    default:
      return <span>{UnitName} {Description}</span>
  }
}

export default UnitName

