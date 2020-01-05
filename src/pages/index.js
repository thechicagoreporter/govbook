import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Table from "../components/table"
import SEO from "../components/seo"


const IndexPage = ({ data }) => {
  const { contacts, lastUpdated } = data.sourceData

  return (
    <Layout>
      <SEO />
      <Table contacts={contacts} lastUpdated={lastUpdated} />
    </Layout>
  )
}

export const query = graphql`
  query {
    sourceData {
      contacts {
        code
        unitname
        description
        county
        ceofname
        ceolname
        ceoemail
        ceophone
        ceoext
        ceotitle
        unittypeslug
        slug
      }
      lastUpdated:meta_by_pk(key: "last_updated") {
        value
      }
    }
  }
`

export default IndexPage