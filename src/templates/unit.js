import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"



export default ({ data }) => {
  const { contactsCsv: contact } = data
  const pairs = Object.entries(contact).filter(([key, value]) => value !== "")
  return (
    <Layout>
      <div className="unit">
        {pairs.map(([key, value]) => (
          <div key={`${key}`}>
            <span className="key">{key}</span>
            <span className="value">{value}</span>
          </div>
        ))}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($Code: String!) {
    contactsCsv(Code: { eq: $Code }) {
      UnitName
      Description
      City
      County
      Address
      Phone

      FirstName
      LastName
      Email_GOV
      Phone
      Ext
      Fax
      Title

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
      CFOFax
      CFOTitle

      FOIAFName
      FOIALName
      FOIAEmail
      FOIAPhone
      FOIAExt
      FOIAFax
      FOIATitle

      PAFName
      PALName
      PAEmail
      PAPhone
      PAExt
      PAFax
      PATitle

      TIFFName
      TIFLName
      TIFEmail
      TIFPhone
      TIFExt
      TIFFax
      TIFTitle

    }
  }
`
