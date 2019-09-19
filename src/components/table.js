import React from "react"
import ContainerDimensions from "react-container-dimensions"
import queryString from "query-string"
import { FiDownload, FiX, FiArrowDown, FiArrowUp, FiSearch } from "react-icons/fi"
import { FixedSizeList as List } from "react-window"
import { injectIntl, FormattedMessage, Link } from "gatsby-plugin-intl"
import { navigate } from "@reach/router"
import debounce from "lodash/debounce"

import UnitName from "../components/unitname"
import logo from "../images/logo.png"

const SLUG = "govbook"
const FOOT_HEIGHT = 154
const LOGO_HEIGHT = 40
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
      <p className="name">
        {item.CEOFName} {item.CEOLName}, {item.CEOTitle}
      </p>
      <p className="email">
        {item.CEOEmail}
      </p>
      <p className="phone">
        {item.CEOPhone}{(item.Ext) && (<>x{item.Ext}</>)}
      </p>
    </div>
  </Link>
}

class Table extends React.Component {

  constructor(props) {
    super(props)
    this.listRef = React.createRef()
    this._debouncedTrackSearch = debounce(this._trackSearch, 500)

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

  _trackSearch = (filter) => {
    window.gtag && window.gtag("event", "click", {
      event_category: SLUG,
      event_action: "query",
      event_label: filter,
    })
  }

  onSearch = (event) => {
    const filter = event.target.value
    this._debouncedTrackSearch(filter)
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
      const cleanFilter = filter.replace(/[&|of]/gi, "")
      const parts = cleanFilter.split(" ").filter( (item) => (item !== "") )

      var results = []

      if (!results.length) {
        results = lunrIndex.index.search(parts.map( (item) => (`+${item}`)).join(" "))
      }

      if (!results.length) {
        results = lunrIndex.index.search(filter)
      }

      if (!results.length) {
        results = lunrIndex.index.search(`${filter}*`)
      }

      if (!results.length) {
        results = lunrIndex.index.search(parts.map( (item) => (`+${item}*`)).join(" "))
      }

      if (!results.length) {
        results = lunrIndex.index.search(`${filter}~2`)
      }

      return results.map(({ ref }) => lunrIndex.store[ref].Code)
    } catch(error) {
      return []
    }
  }

  clearFilter = () => {
    window.gtag && window.gtag("event", "click", {
      event_category: SLUG,
      event_action: "filter",
      event_label: "clear",
    })
    this.setState({ filter: "" }, this.resetData)
  }

  launchDownload = () => {
    window.gtag && window.gtag("event", "click", {
      event_category: SLUG,
      event_action: "download",
    })
  }

  scrollToTop = () => {
    window.gtag && window.gtag("event", "click", {
      event_category: SLUG,
      event_action: "footer",
      event_label: "scroll to top",
    })
    this.listRef.current.scrollToItem(0)
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
          <div className="input-wrapper">
            <div className="search-box">
              <input
                type="text"
                placeholder={intl.formatMessage({ id: "search.placeholder" })}
                onChange={this.onSearch}
                spellCheck={false}
                value={filter || ""}
              />
              {(filter) && (
                <a className="reset-button" onClick={this.clearFilter}><FiX /></a>
              )}
            </div>
          </div>
          <div className="results">
            <p>
              {(contacts.length < this.props.contacts.length) && (
                <FormattedMessage
                  id="tableHeaders.filterMessage"
                  values={{ results: contacts.length, total: this.props.contacts.length }}
                />
              )}
              {(contacts.length === this.props.contacts.length) && (
                <FormattedMessage id="tableHeaders.callToAction" values={{ total: this.props.contacts.length }} />
              )}
            </p>
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
              ref={this.listRef}
            >
              {Row}
            </List>
          </ContainerDimensions>
        </div>

        <div
          className="table-foot"
          style={{
            height: (!filter && footHeight > LOGO_HEIGHT) ? footHeight : LOGO_HEIGHT,
          }}
        >
          <div>
            <div className="table-foot-logo">
              <a href="https://www.chicagoreporter.com"><img src={logo} alt={intl.formatMessage({ id: "author" })} /></a>

              <div className="footer-state">
                {(scrollOffset < LOGO_HEIGHT && !filter) && (<>
                  <span><FormattedMessage id="scrollMessage.scroll" /> <FiArrowDown /></span>
                </>)}
                {(scrollOffset > LOGO_HEIGHT) && (
                  <span className="button" onClick={this.scrollToTop}>
                    <FormattedMessage id="scrollMessage.backToTop" /> <FiArrowUp />
                  </span>
                )}
                {(scrollOffset < LOGO_HEIGHT && filter) && (
                  <span className="button" onClick={this.clearFilter}>
                    <FormattedMessage id="scrollMessage.clearFilter" /> <FiX />
                  </span>
                )}
              </div>
            </div>
            <div className="table-foot-description">
              <p>
                <FormattedMessage id="welcomeMessage.description" />
              </p>
              <p>
                <Link to="/about"><FormattedMessage id="welcomeMessage.moreLink" /></Link> | <a href={"contacts.csv"}><FormattedMessage id="welcomeMessage.downloadLink" /></a>
              </p>
            </div>
            <div className="table-foot-source-line">
              <p>
                <FormattedMessage id="welcomeMessage.sourceLine" values={{ lastUpdated: "2019-09-19" }} />
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default injectIntl(Table)
