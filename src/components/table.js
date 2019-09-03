import React from "react"
import ContainerDimensions from "react-container-dimensions"
import { FixedSizeList as List } from "react-window"
import { injectIntl, FormattedMessage, Link } from "gatsby-plugin-intl"

import UnitName from "../components/unitname"

const FOOT_HEIGHT = 125

const Row = ({ index, style, data }) => {
  const item = data[index]
  return <Link to={`/${item.fields.path}`} className="row" style={style}>
    <div className="unit-name">
      <UnitName {...item} />
    </div>
    <div className="county">
      {item.County}
    </div>
  </Link>
}

class Table extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      scrollTop: 0,
    }
  }

  onScroll = (event) => {
    const { scrollTop } = event.target
    this.setState({ scrollTop })
  }

  render() {
    const { contacts } = this.props
    const { scrollTop } = this.state
    const footHeight = FOOT_HEIGHT - scrollTop

    return (
      <div className="table">
        <div className="table-search">
          <div>
            <input
              type="text"
              placeholder="Search"
            />
          </div>
        </div>

        <div className="table-head">
          <div className="row">
            <div className="unit-name">
              <FormattedMessage id="tableHeaders.unit" />
            </div>
            <div className="county">
              <FormattedMessage id="tableHeaders.county" />
            </div>
          </div>
        </div>
        <div
          className="table-body"
          onScroll={this.onScroll}
        >
          <ContainerDimensions>
            <List
              itemCount={contacts.length}
              itemData={contacts}
              itemSize={45}
            >
              {Row}
            </List>
          </ContainerDimensions>
        </div>

        <div
          className="table-foot"
          style={{
            height: (footHeight > 0) ? footHeight : 0
          }}
        >
          <div>
            <p>
              <FormattedMessage id="welcomeMessage.description" />
              <FormattedMessage id="welcomeMessage.moreLink" />
            </p>
            <p>
              <FormattedMessage id="welcomeMessage.sourceLine" values={{ lastUpdated: "TK" }} />
            </p>
          </div>
        </div>
      </div>
    )
  }
}

export default injectIntl(Table)

