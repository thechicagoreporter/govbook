/**
 * Format a unit's name
 */

import React from "react"
import { FormattedMessage } from "gatsby-plugin-intl"

function UnitName({ intl, unitname, description, unittypeslug }) {
  switch (unittypeslug) {
    case "city":
    case "village":
    case "township":
      return <span>
          <FormattedMessage
            id={`unitLabels.${unittypeslug}`}
            values={{ unitname }}
          />
        </span>
    case "community-college":
      return <span>{unitname}</span>
    default:
      return <span>{unitname} {description}</span>
  }
}

export default UnitName

