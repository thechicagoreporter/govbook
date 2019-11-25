<h1 align="center">
    Gov Book
</h1>

The Chicago Reporter's government phonebook for Illinois.

Resources:

* [govbook.chicagoreporter.com](https://govbook.chicagoreporter.com)
* [Public Google Drive folder](https://drive.google.com/open?id=1TOPJV777cxm63pN56ujRelKA9F-RymzG)
* [Private Google Drive folder](https://drive.google.com/drive/folders/19VgPYMBrVSXkCXu_cbm3XAdcvp7SVuvm) for Chicago Reporter use only

## Adapting this code

We welcome and encourage users to adapt this open source software for your purposes. However, as specified in the license, you may not publish your own version of the site using the assets in `src/images` without replacing with your own assets or asking our permission.

## Requirements

* GNU Make, Git, standard build tools (`xcode-select --install` on Mac, `apt install build-essential` on Ubuntu)
* nodejs (`brew install node`, `apt install nodejs` on Ubuntu)
* sqlite3 (`brew install sqlite3` on Mac, `apt install sqlite3` on Ubuntu)
* Gatsby CLI (`npm install -g gatsby-cli` with npm available)


## 🚀 Get started

1.  ** Install**

    Install Javascript requirements.

    ```sh
    npm install
    ```

To enable deployment, create a `.env` file with the lines:

```
BUCKET=my.bucket.aws
SLUG=govbook
LIMIT=0
```

1.  **Build data.**

    The project comes with a recent version of the comptroller data. To build the latest, you must clean first. Because the data is bundled, this step is optional.

    ```sh
    make clean
    make all
    ```
 To learn more about makefiles, read [Mike Bostock’s guide.](https://bost.ocks.org/mike/make/)

1.  **Start developing.**

    Start local server.

    ```sh
    gatsby develop
    ```
      * View at [http://localhost:8000/](http://localhost:8000/).
      * To quit, use Ctrl-C.

    **Note**: You must re-build the site using `gatsby develop` to view changed items in the translation string files (e.g. after making changes in `es.json` or `en.json`). Sometimes there is a bug where the new changes don’t show up after saving and rebuilding. This is an issue with the cache. To address it, type `rm -Rf .cache` and then try the build again.

2. ** Deploy.**

    Deploy to the currently activated environment (a bucket and slug combo).

    ```sh
    make deploy
    ```

## 🧐 What's inside?

A quick look at the top-level files and directories you'll see in a Gatsby project.

    .
    ├── node_modules
    ├── src
    ├── .gitignore
    ├── .prettierrc
    ├── gatsby-browser.js
    ├── gatsby-config.js
    ├── gatsby-node.js
    ├── gatsby-ssr.js
    ├── LICENSE
    ├── package-lock.json
    ├── package.json
    └── README.md

1.  **`/node_modules`**: This directory contains all of the modules of code that your project depends on (npm packages) are automatically installed.

2.  **`/src`**: This directory will contain all of the code related to what you will see on the front-end of your site (what you see in the browser) such as your site header or a page template. `src` is a convention for “source code”.

**GovBook-specific architecture:**
  * **`src/intl/en.json`**: pulls from here for the English version of the site
  * **`src/intl/es.json`**: pulls from here for the Spanish version of the site
  * **`src/pages/index.js`**: GraphQL query that calls **`table.js`** to build the main landing page of the site.
  * **`src/components/table.js`**: controls main landing page for GovBook
  * **`src/styles/main.scss`**: CSS formatting for the site
  * **`src/templates/pageTemplate.js`**: controls the About page for GovBook
  * **`src/templates/unit.js`**: controls the ‘units’ or individual listings of govt officials
  * **`src/pages/markdown/static/about/en.md`**:  defines content for the English “About” page
  * **`src/pages/markdown/static/about/es.md`**:  defines content for the Spanish “About” page

3.  **`.gitignore`**: This file tells git which files it should not track / not maintain a version history for.

4.  **`.prettierrc`**: This is a configuration file for [Prettier](https://prettier.io/). Prettier is a tool to help keep the formatting of your code consistent.

5.  **`gatsby-browser.js`**: This file is where Gatsby expects to find any usage of the [Gatsby browser APIs](https://www.gatsbyjs.org/docs/browser-apis/) (if any). These allow customization/extension of default Gatsby settings affecting the browser.

6.  **`gatsby-config.js`**: This is the main configuration file for a Gatsby site. This is where you can specify information about your site (metadata) like the site title and description, which Gatsby plugins you’d like to include, etc. (Check out the [config docs](https://www.gatsbyjs.org/docs/gatsby-config/) for more detail).

7.  **`gatsby-node.js`**: This file is where Gatsby expects to find any usage of the [Gatsby Node APIs](https://www.gatsbyjs.org/docs/node-apis/) (if any). These allow customization/extension of default Gatsby settings affecting pieces of the site build process.

8.  **`gatsby-ssr.js`**: This file is where Gatsby expects to find any usage of the [Gatsby server-side rendering APIs](https://www.gatsbyjs.org/docs/ssr-apis/) (if any). These allow customization of default Gatsby settings affecting server-side rendering.

9.  **`LICENSE`**: Gatsby is licensed under the MIT license.

10. **`package-lock.json`** (See `package.json` below, first). This is an automatically generated file based on the exact versions of your npm dependencies that were installed for your project. **(You won’t change this file directly).**

11. **`package.json`**: A manifest file for Node.js projects, which includes things like metadata (the project’s name, author, etc). This manifest is how npm knows which packages to install for your project. It include dependencies for the project.

12. **`README.md`**: A text file containing useful reference information about your project.



## 🎓 Learning Gatsby

Looking for more guidance? Full documentation for Gatsby lives [on the website](https://www.gatsbyjs.org/). Here are some places to start:

- **For most developers, we recommend starting with our [in-depth tutorial for creating a site with Gatsby](https://www.gatsbyjs.org/tutorial/).** It starts with zero assumptions about your level of ability and walks through every step of the process.

- **To dive straight into code samples, head [to our documentation](https://www.gatsbyjs.org/docs/).** In particular, check out the _Guides_, _API Reference_, and _Advanced Tutorials_ sections in the sidebar.
