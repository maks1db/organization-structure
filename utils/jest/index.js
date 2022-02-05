const { JSDOM } = require('jsdom');

const jsdom = new JSDOM(
    `<!doctype html>
    <html>
        <head>
            <script></script>
        </head>
        <body>
            <div id="root"></div>
        </body>
    </html>`,
);
const { window } = jsdom;

global.window = window;
global.document = window.document;

global.navigator = {
    userAgent: 'node.js',
};
