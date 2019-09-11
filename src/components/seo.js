/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { injectIntl } from "gatsby-plugin-intl"

function SEO({ intl, meta, contact }) {
  const description = (contact.Code) ?
    intl.formatMessage({'id': 'unitSocialDescription'}, contact) :
      intl.formatMessage({ id: "description" })

  const unitTitle = (contact.Code) ?
    intl.formatMessage({ id: "unitTitle" }, contact) :
      null

  const title = (unitTitle) ?
    `${unitTitle} | ${intl.formatMessage({ id: "shortTitle" })}` :
      intl.formatMessage({ id: "shortTitle" })

  return (
    <Helmet
      htmlAttributes={{
        lang: intl.locale,
      }}
      title={title}
      titleTemplate={title}
      meta={[
        {
          name: `description`,
          content: description,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: description,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: intl.formatMessage({ id: "author" }),
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: description,
        },
      ].concat(meta)}
    />
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  contact: {},
}

SEO.propTypes = {
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  contact: PropTypes.object,
}

export default injectIntl(SEO)
