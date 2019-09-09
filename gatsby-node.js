const path = require(`path`)
const slugify = require('slugify')
const { createFilePath } = require(`gatsby-source-filesystem`)

const SLUGOPTS = {
  lower: true,
  remove: /[*#.]/g,
}

// @TODO move to query!
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `Contacts`) {
    const category = slugify(node.Description, SLUGOPTS)
    const county = slugify(node.County, SLUGOPTS)
    const city = slugify(node.City, SLUGOPTS)
    const name = slugify(node.UnitName, SLUGOPTS)

    createNodeField({
      node,
      name: `path`,
      value: `${county}/${category}/${name}`,
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
      allContacts {
        nodes {
          Code
          UnitName
          Description
          City
          County
          Address
          State
          Phone
          ZIP

          FirstName
          LastName
          Email_GOV
          Phone
          Ext
          Fax
          Title

          CEOFName
          CEOLName
          CEOEmail
          CEOPhone
          CEOExt
          CEOFax
          CEOTitle

          CFOFName
          CFOLName
          CFOEmail
          CFOPhone
          CFOExt
          CFOFax
          CFOTitle
          CFOAddr
          CFOCity
          CFOState
          CFOZIP

          FOIAFName
          FOIALName
          FOIAEmail
          FOIAPhone
          FOIAExt
          FOIAFax
          FOIATitle

          PAFName
          PALName
          PAEmail
          PAPhone
          PAExt
          PAFax
          PATitle

          TIFFName
          TIFLName
          TIFEmail
          TIFPhone
          TIFExt
          TIFFax
          TIFTitle

          fields {
            categorySlug
            path
          }
        }
      }
    }
  `)
  result.data.allContacts.nodes.forEach((node) => {
    createPage({
      path: node.fields.path,
      component: path.resolve(`./src/templates/unit.js`),
      context: {
        contact: node,
      },
    })
  })
}
