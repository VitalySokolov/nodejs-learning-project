const app = require('./app');
const http = require('http');

const port = process.env.PORT || 3000;

// app.listen(port, () => console.log(`Server started on port ${port}`));

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port, () => console.log(`Server started on port ${port}`));
// server.on('error', onError);

