import React from "react"
import { IntlContextConsumer } from "gatsby-plugin-intl"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Markdown from "../components/markdown"
import { graphql } from "gatsby"
import get from "lodash/get"

const getVersionForLanguage = (versions, lang) => (
  versions.find(v => v.lang === lang)
)

const getResolvedVersionForLanguage = (versions, lang, fallbackLang) => {
  const current = getVersionForLanguage(versions, lang)
  const fallback = getVersionForLanguage(versions, fallbackLang)

  const fields = [
    'title',
    'date',
    'markdown',
  ].reduce((m, f) => {
    m[f] = get(current, f, fallback[f])
    return m
  }, {})

  return fields
}

const Page = ({ currentLanguage, current }) => {
  const { lang: fallbackLang, versions } = current
  const fields = getResolvedVersionForLanguage(versions, currentLanguage, fallbackLang)

  return (
    <Layout>
      <SEO title={fields.title} />
      <div className="page-body">
        <h1>{fields.title}</h1>
        <Markdown markdown={fields.markdown} />
      </div>
    </Layout>
  )
}

export default function Template({ data }) {
  console.log(data)
  return (
    <IntlContextConsumer>
      {({ language: currentLanguage }) => (
        <Page
          currentLanguage={currentLanguage}
          current={data.current.fields.page}
        />
      )}
    </IntlContextConsumer>
  )
}

export const pageQuery = graphql`
  fragment FileFields on File {
    fields {
      page {
        path
        type
        lang
        versions {
          lang
          date
          title
          markdown
        }
      }
    }
  }
  query($relativePath: String!) {
    current: file( relativePath: {  eq: $relativePath } ) {
      ...FileFields
    }
  }
`
