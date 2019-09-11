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
      value: `${county}/${name}-${category}`,
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
          County

          FirstName
          LastName
          Email_GOV
          Phone
          Ext
          Fax
          Title
          City
          Address
          State
          Phone
          ZIP

          CEOFName
          CEOLName
          CEOEmail
          CEOPhone
          CEOExt
          CEOFax
          CEOTitle
          CEOAddr
          CEOCity
          CEOState
          CEOZIP

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
          FOIAAddr
          FOIACity
          FOIAState
          FOIAZIP

          PAFName
          PALName
          PAEmail
          PAPhone
          PAExt
          PAFax
          PATitle
          PAAddr
          PACity
          PAState
          PAZIP

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
