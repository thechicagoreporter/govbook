import React from "react"
import ContainerDimensions from "react-container-dimensions"
import { useStaticQuery, graphql } from "gatsby"
import { FixedSizeList as List } from "react-window"
import { FormattedMessage } from "gatsby-plugin-intl"

const Row = ({ index, style, data }) => {
  const item = data[index]
  return <div className="row" style={style}>
    <div className="unit-name">
      {item.UnitName}
    </div>
    <div className="description">
      {item.Description}
    </div>
    <div className="location">
      {item.City}, {item.County} county
    </div>
  </div>
}

const Table = () => {
  const data = useStaticQuery(graphql`
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
        }
      }
    }
  `)
  return (
    <div className="table">
      <div className="table-head">
        <div className="row">
          <div><FormattedMessage id="tableHeaders.unit" /></div>
          <div><FormattedMessage id="tableHeaders.description" /></div>
          <div><FormattedMessage id="tableHeaders.location" /></div>
        </div>
      </div>
      <div className="table-body">
        <ContainerDimensions>
          <List
            itemCount={data.allContactsCsv.nodes.length}
            itemData={data.allContactsCsv.nodes}
            itemSize={55}
          >
            {Row}
          </List>
        </ContainerDimensions>
      </div>
    </div>
  )
}

export default Table

