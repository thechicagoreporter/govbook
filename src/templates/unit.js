import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import UnitName from "../components/unitname"
import { FormattedMessage } from "gatsby-plugin-intl"


export default ({ data }) => {
  const { contactsCsv: contact } = data
  return (
    <Layout>
      <div className="unit">
        <FormattedMessage id="unitLabels.townAndCounty" values={{...contact}} />
        <UnitName {...contact} />
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

      fields {
        categorySlug
      }

    }
  }
`
