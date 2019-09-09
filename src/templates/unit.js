import React from "react"
import Layout from "../components/layout"
import UnitName from "../components/unitname"
import { FormattedMessage } from "gatsby-plugin-intl"
import { FiUserPlus } from "react-icons/fi";


export default ({ pageContext }) => {
  const { contact } = pageContext
  return (
    <Layout>
      <div className="unit">
        <h1><UnitName {...contact} /></h1>
        <h2><FormattedMessage id="unitLabels.townAndCounty" values={{...contact}} /></h2>

        <div className="unit-contact main-contact">
          <div className="meta">
            <h3><FormattedMessage id="unitLabels.mainContact" /></h3>
            <button><FiUserPlus /> <FormattedMessage id="unitLabels.vcf" /></button>
          </div>
          <div className="details">
            <h4 className="name">
              {contact.FirstName} {contact.LastName}{(contact.Title) && (<>, {contact.Title}</>)}
            </h4>
            <p className="phone">
              <a href={`tel:${contact.Phone}`}>{contact.Phone}{(contact.Ext) && (<>x{contact.Ext}</>)}</a>
            </p>
            <p className="fax">
              Fax: {contact.Fax}
            </p>
            <p className="email">
              <a href={`mailto:${contact.Email_GOV}`}>{contact.Email_GOV}</a>
            </p>
            <p className="address">
              {contact.Address}, {contact.City}, IL {contact.ZIP}
            </p>
          </div>
        </div>

        <div className="unit-contact main-contact">
          <div className="meta">
            <h3><FormattedMessage id="unitLabels.CFOContact" /></h3>
            <button><FiUserPlus /> <FormattedMessage id="unitLabels.vcf" /></button>
          </div>
          <div className="details">
            <h4 className="name">
              {contact.CFOFName} {contact.CFOLName}{(contact.CFOTitle) && (<>, {contact.CFOTitle}</>)}
            </h4>
            <p className="phone">
              <a href={`tel:${contact.CFOPhone}`}>{contact.CFOPhone}{(contact.CFOExt) && (<>x{contact.CFOExt}</>)}</a>
            </p>
            <p className="fax">
              Fax: {contact.CFOFax}
            </p>
            <p className="email">
              <a href={`mailto:${contact.CFOEmail}`}>{contact.CFOEmail}</a>
            </p>
            <p className="address">
              {contact.CFOAddr}, {contact.CFOCity}, {contact.State} {contact.CFOZIP}
            </p>
          </div>
        </div>

      </div>
    </Layout>
  )
}
