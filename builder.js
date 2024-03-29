'use strict';

const
    fs             = require('fs'),
    htmlMinifier   = require('html-minifier'),
    sourceData     = require('./src/data'),
    readFile       = path => fs.readFileSync(path, 'utf-8'),
    encodeToBase64 = path => new Buffer(fs.readFileSync(path)).toString('base64'),

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

if ( fs.existsSync('./node_modules/hack/dist/hack.css') ) {
    cssString = readFile('./node_modules/hack/dist/hack.css');
} else {
    throw new Error('CSS source file doesn\'t exists at the "./node_modules/hack/dist/hack.css"!');
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
        header         = readFile('./src/html.templates/header.tpl'),
        footer         = readFile('./src/html.templates/footer.tpl'),
        unknownFavicon = `data:image/png;base64,${encodeToBase64('./src/images/favicon.unknown.png')}`;

    let body = '';

    contentItems.forEach((item, index) => {
        const faviconPath = item.uri.replace(/^(https?:\/\/[^/]+).*$/, '$1/favicon.ico');

        let favicon = new Image();

        favicon.onerror = () => favicon.src = unknownFavicon;

        //favicon.classList.add('favicon');
        favicon.src = faviconPath;

        body += `<tr><td>${index}</td><td>${favicon}</td><td>${item.description}</td><td><a href="${item.uri}" target="_blank">Get it!</a></td></tr>`;
    });

    return header.replace('{css}', cssString) + body + footer;
}


// TODO: possibly rework -- call chain is tooooo long
fs.writeFileSync('index.html', htmlMinifier.minify(buildHTMLString(sourceData), htmlMinifierOptions));
