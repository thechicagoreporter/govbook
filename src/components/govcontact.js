/**
 * Format a govt contact
 */

import React from "react"
import { FormattedMessage } from "gatsby-plugin-intl"

const SLUG = "govbook"

function GovContact({ contact, type, firstName, lastName, title, phone, ext, fax, email, address, city, state, zip }) {

  const phoneClick = (event) => {
    const phone = event.target.href.slice(4, 0)
    window.gtag && window.gtag("event", "click", {
      event_category: SLUG,
      event_action: "phone-click",
      event_label: `${phone} - ${firstName} ${lastName}`,
    })
  }

  const emailClick = (event) => {
    window.gtag && window.gtag("event", "click", {
      event_category: SLUG,
      event_action: "email-click",
      event_label: `${email} - ${firstName} ${lastName}`,
    })
  }

  return <>
    {(firstName) && (
      <h2>
        <span className="contact-type"><FormattedMessage id={`contactLabels.${type}`} /></span>
      </h2>
    )}
    <div className="meta">
      <h3 className="name">
        {firstName} {lastName}
      </h3>
      {(title) && (<h4>{title}</h4>)}
    </div>
    <div className="details">
      { (phone) && (
        <p className="phone">
          <FormattedMessage id="contactLabels.phone" /> <a onClick={phoneClick} href={`tel:${phone}`}>{phone}{(ext) && (<>x{ext}</>)}</a>
        </p>
      )}
      { (email) && (
        <p className="email">
          <FormattedMessage id="contactLabels.email" /> <a onClick={emailClick} href={`mailto:${email}`}>{email}</a>
        </p>
      )}
      { (fax) && (
        <p className="fax">
          <FormattedMessage id="contactLabels.fax" /> <a onClick={phoneClick} href={`fax:${fax}`}>{fax}</a>
        </p>
      )}
      { (address) && (
        <p className="address">
          {address}, {city}, {state} {zip}
        </p>
      )}
    </div>
  </>
}

export default GovContact
