'use strict';

const
    fs   = require('fs'),
    data = fs.readFileSync('./data.md', 'utf-8');

let cssString;

if ( fs.existsSync('./node_modules/nes.css/css/nes.min.css') ) {
    cssString = fs.readFileSync('./node_modules/nes.css/css/nes.min.css', 'utf-8');
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
        header = '<!DOCTYPE html> \
                  <html lang="en"> \
                      <head> \
                          <meta charset="UTF-8"> \
                          <title>Canary</title> \
                          <link href="https://fonts.googleapis.com/css?family=Press+Start+2P" rel="stylesheet">' + cssString +
                     '</head> \
                      <body> \
                          <div class="nes-container is-rounded is-centered"> \
                              <div class="nes-table-responsive"> \
                                  <table class="nes-table is-bordered is-centered is-dark"> \
                                      <thead> \
                                          <tr> \
                                              <th>Service description</th> \
                                              <th>Actions</th> \
                                          </tr> \
                                      </thead> \
                                      <tbody>',
        footer = '</tbody></table></div></div></body></html>';

    let body = '';

    contentItems.forEach(item => {
        body += `<tr><td>${item.description}</td><td><a href="${item.uri}" target="_blank" class="nes-btn is-success">Get it!</a></td></tr>`;
    });

    return header + body + footer;
}
