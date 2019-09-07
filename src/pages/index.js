import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Table from "../components/table"


const IndexPage = ({ data }) => {
  const { nodes: contacts } = data.allContactsCsv
  return (
    <Layout>
      <Table contacts={contacts} />
    </Layout>
  )
}

export const query = graphql`
  query {
    allContacts {
      nodes {
        UnitName
        Description
        City
        County
        Phone
        Email_GOV
        Ext
        Code
        FirstName
        LastName
        Title
        fields {
          path
          categorySlug
        }
      }
    }
  }
`

export default IndexPage


