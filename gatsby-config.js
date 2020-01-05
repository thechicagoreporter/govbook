require('dotenv').config()

module.exports = {
  siteMetadata: {
    defaultLanguage: 'en',
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    {
      // Querying to a GraphQL database
      resolve: `gatsby-source-graphql`,
      options: {
        typeName: 'Contacts',
        // This is the field under which the data will be accessible in a future version
        fieldName: 'sourceData',
        url: "http://govbook-api.herokuapp.com/v1/graphql"
      },
    },
    {
      resolve: `gatsby-plugin-intl`,
      options: {
        // language JSON resource path
        path: `${__dirname}/src/intl`,
        // supported language
        languages: [`en`, `es`],
        // language file path
        defaultLanguage: `en`,
        redirect: true,
      },
    },
    // {
    //   resolve: `gatsby-plugin-lunr`,
    //   options: {
    //     languages: [
    //       {
    //         name: 'en',
    //       },
    //     ],
    //     // Fields to index. If store === true value will be stored in index file.
    //     // Attributes for custom indexing logic. See https://lunrjs.com/docs/lunr.Builder.html for details
    //     fields: [
    //       { name: 'county', store: false, boost: 30 },
    //       { name: 'unitname', store: false, boost: 10, },
    //       { name: 'execname', store: false, boost: 10 },
    //       { name: 'description', store: false },
    //       { name: 'code', store: true },
    //     ],
    //     // How to resolve each field's value for a supported node type
    //     resolvers: {
    //       Contacts: {
    //         county: node => node.county,
    //         description: node => node.description,
    //         unitname: node => node.unitname,
    //         code: node => node.code,
    //         execname: node => (`${node.ceofname} ${node.ceolname}`),
    //       },
    //     },

    //     filterNodes: (node) => (node.fields.address),

    //     //custom index file name, default is search_index.json
    //     filename: 'search_index.json',
    //     //custom options on fetch api call for search_ındex.json
    //     fetchOptions: {
    //       credentials: 'same-origin'
    //     },
    //   },
    // },
    // Markdown driven pages
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `markdown`,
        path: `${__dirname}/src/pages/markdown`,
      },
    },

    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [
          "UA-2350659-1", // Google Analytics / GA
        ],
        gtagConfig: {
          anonymize_ip: true,
          send_pageview: false,
        },
        pluginConfig: {
          // We'll dispatch our own prefixed pageviews
          exclude: ["/*"],
        },
      },
    },

    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Open Sans`,
            subsets: [`latin`],
            variants: [`400`, `400i`, `600`, `700`],
          },
          {
            family: `Open Sans Condensed`,
            subsets: [`latin`],
            variants: [`300l`, `300i`, `700`],
          },
        ],
      },
    },

    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `GovBook`,
        short_name: `GovBook`,
        start_url: `/`,
        background_color: `#000000`,
        theme_color: `#ffffff`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
  ],
}
