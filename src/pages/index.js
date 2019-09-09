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
        City
        Address
        State
        Phone
        ZIP

        CEOFName
        CEOLName
        CEOEmail
        CEOPhone
        CEOExt
        CEOFax
        CEOTitle

        CFOFName
        CFOLName
        CFOEmail
        CFOPhone
        CFOExt
        CFOTitle

        FOIAFName
        FOIALName
        FOIAEmail
        FOIAPhone
        FOIAExt
        FOIATitle

        PAFName
        PALName
        PAEmail
        PAPhone
        PAExt
        PATitle

        TIFFName
        TIFLName
        TIFEmail
        TIFPhone
        TIFExt
        TIFTitle

        fields {
          categorySlug
          path
        }
      }
    }
  }
`

export default IndexPage


