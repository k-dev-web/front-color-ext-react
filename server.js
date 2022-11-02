var express = require('express');
var path = require('path');

var app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, 'build/index.html'));
});

app.listen( process.env.PORT || 3000,(err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`server started port: ${process.env.PORT || 3000}`);
    }
});
