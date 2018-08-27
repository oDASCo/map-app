var app = require('../server/server');
var port = 53456
app.listen(port, function() {
    console.log('running at localhost: ' + port);
});