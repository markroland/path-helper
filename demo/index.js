#!/usr/bin/env node

/*
Run From the project root:

npm run demo

or

node ./demo/index.js
*/

// Include libraries
const path = require('path');
const fs = require('fs');

// Create ExpressJS app object
const express = require('express');
const app = express();
const port = 8000;

// Handle requests for the root of the app
app.get('/', (req, res) => {

  // Read in HTML
  let html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

  // // Add sketch data to HTML
  // html = html.replace("const sketches = []", "const sketches = " + JSON.stringify(sketches));

  // // Add Commit hash to HTML (if hash available)
  // const revision = require('child_process')
  //   .execSync('git -C ' + __dirname + ' rev-parse --short HEAD')
  //   .toString().trim();
  // if (revision !== '') {
  //   html = html.replace("const commit_hash = ''", "const commit_hash = '" + revision + "'");
  // }

  res.send(html);

  // Send unmodified file
  // res.sendFile(path.join(__dirname, 'public/index.html'));

});

// Serve class source file
app.use('/PathHelper.js', express.static(path.join(__dirname, '/../src/PathHelper.js')));

// Start listening for requests
app.listen(port, () => {
  console.log(`Serving at http://localhost:${port}`);
});