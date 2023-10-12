const express = require('express');

const app = express();
const port = 80;

//midleware for json encode/decode
app.use(express.json());
//middleware for enabled post request.body (input form / json input) x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('<H1>Halaman Utama</H1>');
});

// Listen PORT
app.listen(port, () => {
    console.log(`Running server at localhost:${port}`);
});




// var http = require('http');
// var server = http.createServer(function(req, res) {
//     res.writeHead(200, {'Content-Type': 'text/plain'});
//     var message = 'It works!\n',
//         version = 'NodeJS ' + process.versions.node + '\n',
//         response = [message, version].join('\n');
//     res.end(response);
// });
// server.listen();
