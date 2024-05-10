const {resolve} = require('path');

// mcr.config.js
module.exports = {
    name: 'My Coverage Report',
    reports: [
        'v8',
        'console-details'
    ],
    outputDir: 'coverage',
    entryFilter: {
        "**/node_modules/**": false,
        "**": true
    },
    sourceFilter: {
        "**/src/main/**/*.ts": true
    },
    basePath: resolve(__dirname)
};