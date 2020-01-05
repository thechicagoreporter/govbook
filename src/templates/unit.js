import React from "react"
import Layout from "../components/layout"
import UnitName from "../components/unitname"
import GovContact from "../components/govcontact"
import { FormattedMessage, FormattedHTMLMessage, Link } from "gatsby-plugin-intl"
import SEO from "../components/seo"


export default ({ pageContext }) => {
  const { contact } = pageContext
  return (
    <Layout>
      <SEO
        contact={contact}
      />
      <div className="unit-header">
        <h1>
          <UnitName {...contact} />
        </h1>
        <h2>
          <span>
            <Link to={`/?q=${encodeURIComponent(contact.county)}`}>
              <FormattedMessage id="unitLabels.county" values={{...contact}} />
            </Link>
          </span>
        </h2>
      </div>
      <div className="unit">
        <div className="call-to-action">
          <p><FormattedHTMLMessage id="feedbackCallout" /></p>
        </div>
        <div className="unit-contact ceo-contact">
          <GovContact
            type="ceo"
            contact={contact}
            firstname={contact.ceofname}
            lastname={contact.ceolname}
            title={contact.ceotitle}
            phone={contact.ceophone}
            ext={contact.ceoext}
            fax={contact.ceofax}
            email={contact.ceoemail}
            address={contact.ceoaddr}
            city={contact.ceocity}
            state={contact.ceostate}
            zip={contact.ceozip}
          />
        </div>

        <div className="unit-contact main-contact">
          <GovContact
            type="main"
            contact={contact}
            firstname={contact.firstname}
            lastname={contact.lastname}
            title={contact.title}
            phone={contact.phone}
            ext={contact.ext}
            fax={contact.fax}
            email={contact.email_gov}
            address={contact.address}
            city={contact.city}
            state={contact.state}
            zip={contact.zip}
          />
        </div>

        <div className="unit-contact cfo-contact">
          <GovContact
            type="cfo"
            contact={contact}
            firstname={contact.cfofname}
            lastname={contact.cfolname}
            title={contact.cfotitle}
            phone={contact.cfophone}
            ext={contact.cfoext}
            fax={contact.cfofax}
            email={contact.cfoemail}
            address={contact.cfoaddr}
            city={contact.cfocity}
            state={contact.cfostate}
            zip={contact.cfozip}
          />
        </div>

        <div className="unit-contact pa-contact">
          <GovContact
            type="pa"
            contact={contact}
            firstname={contact.pafname}
            lastname={contact.palname}
            title={contact.patitle}
            phone={contact.paphone}
            ext={contact.paext}
            fax={contact.pafax}
            email={contact.paemail}
            address={contact.paaddr}
            city={contact.pacity}
            state={contact.pastate}
            zip={contact.pazip}
          />
        </div>

        <div className="unit-contact foia-contact">
          <GovContact
            type="foia"
            contact={contact}
            firstname={contact.foiafname}
            lastname={contact.foialname}
            title={contact.foiatitle}
            phone={contact.foiaphone}
            ext={contact.foiaext}
            fax={contact.foiafax}
            email={contact.foiaemail}
            address={contact.foiaaddr}
            city={contact.foiacity}
            state={contact.foiastate}
            zip={contact.foiazip}
          />
        </div>

        <div className="unit-contact tif-contact">
          <GovContact
            type="tif"
            contact={contact}
            firstname={contact.tiffname}
            lastname={contact.tiflname}
            title={contact.tiftitle}
            phone={contact.tifphone}
            ext={contact.tifext}
            fax={contact.tiffax}
            email={contact.tifemail}
            address={contact.tifaddr}
            city={contact.tifcity}
            state={contact.tifstate}
            zip={contact.tifzip}
          />
        </div>

      </div>
    </Layout>
  )
}