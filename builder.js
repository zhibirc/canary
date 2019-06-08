'use strict';

const
    fs         = require('fs'),
    readFile   = path => fs.readFileSync(path, 'utf-8'),
    sourceData = readFile('./data.md');

let cssString;

if ( fs.existsSync('./node_modules/nes.css/css/nes.min.css') ) {
    cssString = readFile('./node_modules/nes.css/css/nes.min.css');
} else {
    throw new Error('CSS source file doesn\'t exists at the "./node_modules/nes.css/css/nes.min.css"!');
}


/**
 *
 * @param {Array} content - content for insertion in a result HTML structure
 *
 * @return {string} result HTML string
 */
function buildHTMLString ( contentItems ) {
    const
        header = readFile('./templates/header.tpl'),
        footer = readFile('./templates/footer.tpl');

    let body = '';

    header = header.replace('{css}', cssString);

    contentItems.forEach(item => {
        body += `<tr><td>${item.description}</td><td><a href="${item.uri}" target="_blank" class="nes-btn is-success">Get it!</a></td></tr>`;
    });

    return header + body + footer;
}
