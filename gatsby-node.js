const path = require(`path`)
const slugify = require('slugify')
const { createFilePath } = require(`gatsby-source-filesystem`)

const SLUGOPTS = {
  lower: true,
  remove: /[*.]/g,
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `ContactsCsv`) {
    const category = slugify(node.Description, SLUGOPTS)
    const county = slugify(node.County, SLUGOPTS)
    const city = slugify(node.City, SLUGOPTS)
    const name = slugify(node.UnitName, SLUGOPTS)

    createNodeField({
      node,
      name: `path`,
      value: `${county}/${city}/${name}-${category}`,
    })
    createNodeField({
      node,
      name: `categorySlug`,
      value: category,
    })
  }
}
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allContactsCsv {
        nodes {
          Code
          fields {
            path
          }
        }
      }
    }
  `)
  result.data.allContactsCsv.nodes.forEach((node) => {
    createPage({
      path: node.fields.path,
      component: path.resolve(`./src/templates/unit.js`),
      context: {
        Code: node.Code,
      },
    })
  })
}
