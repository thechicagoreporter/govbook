import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Table from "../components/table"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Table />
  </Layout>
)

export default IndexPage
