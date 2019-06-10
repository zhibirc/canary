'use strict';

const
    fs           = require('fs'),
    htmlMinifier = require('html-minifier'),
    sourceData   = require('./src/data'),
    readFile     = path => fs.readFileSync(path, 'utf-8'),
    // TODO: research on options -- https://www.npmjs.com/package/html-minifier
    htmlMinifierOptions = {
        removeComments:                 true,
        removeCommentsFromCDATA:        true,
        removeCDATASectionsFromCDATA:   true,
        collapseWhitespace:             true,
        collapseBooleanAttributes:      true,
        removeAttributeQuotes:          true,
        removeRedundantAttributes:      true,
        useShortDoctype:                true,
        removeEmptyAttributes:          true,
        removeEmptyElements:            true,
        removeOptionalTags:             true,
        removeScriptTypeAttributes:     true,
        removeStyleLinkTypeAttributes:  true,

        minifyJS:                       true,
        minifyCSS:                      true
    };

let cssString;

if ( fs.existsSync('./node_modules/nes.css/css/nes.min.css') ) {
    cssString = readFile('./node_modules/nes.css/css/nes.min.css');
} else {
    throw new Error('CSS source file doesn\'t exists at the "./node_modules/nes.css/css/nes.min.css"!');
}


/**
 * Build HTML destination file from templates and other resources.
 *
 * @param {Array} contentItems - content for insertion in a result HTML structure
 *
 * @return {string} result HTML string
 */
// TODO: rework -- add flexibility, templates map as a parameter
function buildHTMLString ( contentItems ) {
    const
        header = readFile('./src/html.templates/header.tpl'),
        footer = readFile('./src/html.templates/footer.tpl');

    let body = '';

    contentItems.forEach(item => {
        // TODO: add favicons to descriptions (by CURL, in separate method)
        body += `<tr><td>${item.description}</td><td><a href="${item.uri}" target="_blank" class="nes-btn is-success">Get it!</a></td></tr>`;
    });

    return header.replace('{css}', cssString) + body + footer;
}


// TODO: possibly rework -- call chain is tooooo long
fs.writeFileSync('index.html', htmlMinifier.minify(buildHTMLString(sourceData), htmlMinifierOptions));
