require('dotenv').config()

module.exports = {
  siteMetadata: {
    defaultLanguage: 'en',
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    {
      // Querying to a SQLite database
      resolve: `gatsby-source-sql`,
      options: {
        typeName: 'Contacts',
        // This is the field under which the data will be accessible in a future version
        fieldName: 'dontunderstandthis',
        dbEngine: {
          client: 'sqlite3',
          connection: {
            filename: './data/processed/contacts.sqlite',
          },
          useNullAsDefault: true
        },
        queryChain: function(x) {
          return x
            .select(
              "County",
              "UnitName",
              "Description",
              "Code",
              "Address",
              "City",
              "State",
              "ZIP",
              "FirstName",
              "LastName",
              "Title",
              "Phone",
              "Ext",
              "Fax",
              "Email_GOV",
              "CEOFName",
              "CEOLName",
              "CEOTitle",
              "CEOAddr",
              "CEOCity",
              "CEOState",
              "CEOZIP",
              "CEOPhone",
              "CEOExt",
              "CEOFax",
              "CEOEmail",
              "CFOFName",
              "CFOLName",
              "CFOTitle",
              "CFOAddr",
              "CFOCity",
              "CFOState",
              "CFOZIP",
              "CFOPhone",
              "CFOExt",
              "CFOFax",
              "CFOEmail",
              "PAFName",
              "PALName",
              "PATitle",
              "PAAddr",
              "PACity",
              "PAState",
              "PAZIP",
              "PAPhone",
              "PAExt",
              "PAFax",
              "PAEmail",
              "TIFFName",
              "TIFLName",
              "TIFTitle",
              "TIFAddr",
              "TIFCity",
              "TIFState",
              "TIFZIP",
              "TIFPhone",
              "TIFExt",
              "TIFFax",
              "TIFEmail",
              "FOIAFName",
              "FOIALName",
              "FOIATitle",
              "FOIAAddr",
              "FOIACity",
              "FOIAState",
              "FOIAZIP",
              "FOIAPhone",
              "FOIAExt",
              "FOIAFax",
              "FOIAEmail",
            )
            .from("contacts")
             .limit(20)
        }
      }
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
    {
      resolve: `gatsby-plugin-lunr`,
      options: {
        languages: [
          {
            name: 'en',
          },
        ],
        // Fields to index. If store === true value will be stored in index file.
        // Attributes for custom indexing logic. See https://lunrjs.com/docs/lunr.Builder.html for details
        fields: [
          { name: 'County', store: false, boost: 30 },
          { name: 'UnitName', store: false, boost: 10, },
          { name: 'ExecName', store: false, boost: 10 },
          { name: 'Description', store: false },
          { name: 'Code', store: true },
        ],
        // How to resolve each field's value for a supported node type
        resolvers: {
          Contacts: {
            County: node => node.County,
            Description: node => node.Description,
            UnitName: node => node.UnitName,
            Code: node => node.Code,
            ExecName: node => (`${node.CEOFName} ${node.CEOLName}`),
          },
        },

        filterNodes: (node) => (node.fields.Address),

        //custom index file name, default is search_index.json
        filename: 'search_index.json',
        //custom options on fetch api call for search_ındex.json
        fetchOptions: {
          credentials: 'same-origin'
        },
      },
    },
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
