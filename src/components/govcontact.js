/**
 * Format a govt contact
 */

import React from "react"
import { FormattedMessage } from "gatsby-plugin-intl"
import { FiUserPlus } from "react-icons/fi";
import UnitName from "../components/unitname"

function GovContact({ contact, type, firstName, lastName, title, phone, ext, fax, email, address, city, state, zip }) {
  return <>
    {(firstName) && (
      <h2>
        <span className="contact-type"><FormattedMessage id={`unitLabels.${type}Contact`} /></span>
        <span className="unit-name"><UnitName {...contact} /></span>
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
          Phone: <a href={`tel:${phone}`}>{phone}{(ext) && (<>x{ext}</>)}</a>
        </p>
      )}
      { (fax) && (
        <p className="fax">
          Fax: {fax}
        </p>
      )}
      { (email) && (
        <p className="email">
          Email: <a href={`mailto:${email}`}>{email}</a>
        </p>
      )}
      { (address) && (
        <p className="address">
          Address: {address}, {city}, {state} {zip}
        </p>
      )}
    </div>
  </>
}

export default GovContact
