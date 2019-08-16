import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { FixedSizeList as List } from "react-window"

const Row = ({ index, style, data }) => {
  const item = data[index]
  return <div style={style}>
    {item.UnitName} ({item.Description}), {item.City}, {item.County} county
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
    <List
      height={400}
      itemCount={data.allContactsCsv.nodes.length}
      itemData={data.allContactsCsv.nodes}
      itemSize={35}
      width="100%"
    >
      {Row}
    </List>
  )
}

export default Table

