import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Table from "../components/table"


const IndexPage = ({ data }) => {
  const { nodes: contacts } = data.allContacts
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
        Code
        UnitName
        Description
        County

        FirstName
        LastName
        Email_GOV
        Phone
        Ext
        Title

        CEOFName
        CEOLName
        CEOEmail
        CEOPhone
        CEOExt
        CEOTitle

        FOIAFName
        FOIALName
        FOIAEmail
        FOIAPhone
        FOIATitle

        fields {
          categorySlug
          path
        }
      }
    }
  }
`

export default IndexPage


