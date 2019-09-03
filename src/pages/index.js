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
    allContactsCsv {
      nodes {
        CEOFName
        CEOLName
        CEOTitle
        CFOFName
        CFOLName
        CFOTitle
        Code
        City
        County
        Description
        FOIAFName
        FOIALName
        FOIATitle
        FirstName
        LastName
        PALName
        PAFName
        TIFFName
        TIFLName
        TIFTitle
        Title
        UnitName
        ZIP
        fields {
          path
          categorySlug
        }
      }
    }
  }
`

export default IndexPage


