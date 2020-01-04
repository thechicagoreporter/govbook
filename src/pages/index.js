import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Table from "../components/table"
import SEO from "../components/seo"


const IndexPage = ({ data }) => {
  const { contacts } = data.sourceData

  return (
    <Layout>
      <SEO />
      <Table contacts={contacts} />
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
    }
  }
`

export default IndexPage