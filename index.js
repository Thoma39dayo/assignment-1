// Import built-in Node.js modules
const http = require('http'); // For creating the web server
const fs = require('fs');     // For reading files
const path = require('path'); // For working with file paths

// Set the port number for the server
const PORT = 3000;
// Set the folder where your website files are stored
const PUBLIC_DIR = path.join(__dirname, 'public');

// Create the web server
const server = http.createServer((req, res) => {
  // Figure out which file to serve
  // If the user visits '/', show index.html
  // Otherwise, show the file they asked for (like /style.css or /images/image1.jpg)
  let filePath = path.join(PUBLIC_DIR, req.url === '/' ? 'index.html' : req.url);

  // Get the file extension (like .html, .css, .jpg)
  const extname = String(path.extname(filePath)).toLowerCase();
  // Tell the browser what type of file it is
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.wav': 'audio/wav',
    '.mp4': 'video/mp4',
    '.woff': 'application/font-woff',
    '.ttf': 'application/font-ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'application/font-otf',
    '.wasm': 'application/wasm'
  };

  // Try to read the file from the computer
  fs.readFile(filePath, (error, content) => {
    if (error) {
      // If the file is not found, show a 404 error
      if(error.code == 'ENOENT'){
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 Not Found</h1>', 'utf-8');
      }
      // If there is another error, show a 500 error
      else {
        res.writeHead(500);
        res.end('Sorry, there was a server error: '+error.code+' ..\n');
      }
    }
    else {
      // If the file is found, send it to the browser
      res.writeHead(200, { 'Content-Type': mimeTypes[extname] || 'application/octet-stream' });
      res.end(content, 'utf-8');
    }
  });
});

// Start the server and print a message
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
}); 