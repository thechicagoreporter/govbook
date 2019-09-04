import React from "react"
import ContainerDimensions from "react-container-dimensions"
import queryString from "query-string"
import { FiDownload, FiShare2 } from "react-icons/fi"
import { FixedSizeList as List } from "react-window"
import { injectIntl, FormattedMessage, Link } from "gatsby-plugin-intl"
import { navigate } from "@reach/router"

import UnitName from "../components/unitname"

const FOOT_HEIGHT = 160
const SEARCH_LNG = "en"

const Row = ({ index, style, data }) => {
  const item = data[index]
  return <Link to={`/${item.fields.path}`} className="row" style={style}>
    <div className="unit-name">
      <UnitName {...item} />
    </div>
    <div className="county">
      {item.County}
    </div>
    <div className="contacts">
      <p>
        {item.FirstName} {item.LastName}, {item.Title}
      </p>
      <p>
        {item.Email_GOV}
      </p>
      <p>
        {item.Phone}{(item.Ext) && (<>x{item.Ext}</>)}
      </p>
    </div>
  </Link>
}

class Table extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      scrollOffset: 0,
      filter: "",
      sort: ["UnitName", "City", "County"],
      contacts: this._resetData(props.contacts, "")
    }
  }

  onScroll = ({ scrollOffset }) => {
    this.setState({ scrollOffset })
  }

  onSearch = (event) => {
    const filter = event.target.value
    this.setState({ filter }, this.resetData)
  }

  resetData = () => {
    const { filter } = this.state
    const contacts = this._resetData(this.props.contacts, filter)
    this.setState({ contacts })

    // Set querystring
    if (filter) {
      const qs = queryString.stringify({ q: filter, })
      navigate(`?${qs}`, { replace: true })
    } else {
      navigate(`./`, { replace: true })
    }

  }

  // Stateless filter + sort
  _resetData(contacts, filter) {
    if (filter) {
      const resultCodes = this.getSearchResults(filter)
      return contacts.filter( (item) => (resultCodes.includes(item.Code)) )
    } else {
      return contacts
    }
  }

  getSearchResults(filter) {
    if (!filter || !window.__LUNR__) return []
    const lunrIndex =  window.__LUNR__[SEARCH_LNG]

    try {
      const parts = filter.split(" ")

      var results = lunrIndex.index.search(parts.map( (item) => (`+${item}`)).join(" "))
      
      if (!results.length) {
        results = lunrIndex.index.search(parts.map( (item) => (`+${item}*`)).join(" "))
      }
      return results.map(({ ref }) => lunrIndex.store[ref].Code)
    } catch(error) {
      return []
    }
  }

  componentDidMount() {
    const parsed = queryString.parse(window.location.search)
    this.setState({ filter: parsed.q }, this.resetData)
  }

  render() {
    const { intl } = this.props
    const { contacts, filter, scrollOffset } = this.state
    const footHeight = FOOT_HEIGHT - scrollOffset

    return (
      <div className="table">
        <div className="table-search">
          <div>
            <input
              type="text"
              placeholder={intl.formatMessage({ id: "search.placeholder" })}
              value={filter}
              onChange={this.onSearch}
              spellCheck={false}
            />
            <button><FiDownload /></button>
            <button><FiShare2 /></button>
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
            <div className="contacts">
              <FormattedMessage id="tableHeaders.contacts" />
            </div>
          </div>
        </div>
        <div
          className="table-body"
        >
          <ContainerDimensions>
            <List
              itemCount={contacts.length}
              itemData={contacts}
              itemSize={74}
              onScroll={this.onScroll}
            >
              {Row}
            </List>
          </ContainerDimensions>
        </div>

        <div
          className="table-foot"
          style={{
            height: (!filter && footHeight > 0) ? footHeight : 0,
            display: (!filter && footHeight > 0) ? 'block' : 'none',
          }}
        >
          <div>
            <p>TCR LOGO TK</p>
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

