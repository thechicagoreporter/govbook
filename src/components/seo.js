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

function SEO({ intl, meta }) {
  return (
    <Helmet
      htmlAttributes={{
        lang: intl.locale,
      }}
      title={intl.formatMessage({ id: "title" })}
      titleTemplate={`%s | ${intl.formatMessage({ id: "title" })}`}
      meta={[
        {
          name: `description`,
          content: intl.formatMessage({ id: "description" }),
        },
        {
          property: `og:title`,
          content: intl.formatMessage({ id: "title" }),
        },
        {
          property: `og:description`,
          content: intl.formatMessage({ id: "opengraphDescription" }),
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
          content: intl.formatMessage({ id: "title" }),
        },
        {
          name: `twitter:description`,
          content: intl.formatMessage({ id: "twitterDescription" }),
        },
      ].concat(meta)}
    />
  )
}

SEO.defaultProps = {
  lang: `es`,
  meta: [],
}

SEO.propTypes = {
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
}

export default injectIntl(SEO)
