module.exports = {

  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Open Sans`,
            subsets: [`latin`],
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
      resolve: `gatsby-plugin-intl`,
      options: {
        // language JSON resource path
        path: `${__dirname}/src/intl`,
        // supported language
        languages: [`es`, `en`],
        // language file path
        defaultLanguage: `es`,
        redirect: true,
      },
    },
    //{
      //resolve: `gatsby-plugin-lunr`,
      //options: {
        //languages: [
          //{
            //// ISO 639-1 language codes. See https://lunrjs.com/guides/language_support.html for details
            //name: 'en',
            //// A function for filtering nodes. () => true by default
            ////filterNodes: node => node.frontmatter.lang === 'en',
            //// Add to index custom entries, that are not actually extracted from gatsby nodes
            ////customEntries: [{ title: 'Pictures', content: 'awesome pictures', url: '/pictures' }],
          //},
          //{
            //name: 'es',
            ////filterNodes: node => node.frontmatter.lang === 'fr',
          //},
        //],
        //// Fields to index. If store === true value will be stored in index file.
        //// Attributes for custom indexing logic. See https://lunrjs.com/docs/lunr.Builder.html for details
        //fields: [
          //{ name: 'City', store: true },
          //{ name: 'County', store: true },
          //{ name: 'Description', store: true },
          //{ name: 'UnitName', store: true },
          //{ name: 'ZIP', store: true },
        //],
        //// How to resolve each field's value for a supported node type
        //resolvers: {
          //// For any node of type MarkdownRemark, list how to resolve the fields' values
          ////MarkdownRemark: {
            ////title: node => node.frontmatter.title,
            ////content: node => node.rawMarkdownBody,
            ////url: node => node.fields.url,
          ////},
        //},
        ////custom index file name, default is search_index.json
        //filename: 'search_index.json',
        ////custom options on fetch api call for search_ındex.json
        //fetchOptions: {
          //credentials: 'same-origin'
        //},
      //},
    //},
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/data/processed`,
        ignore: [`**/\.*`], // ignore files starting with a dot
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages/`,
      },
    },

    `gatsby-transformer-csv`,

    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,

    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
  ],
}
