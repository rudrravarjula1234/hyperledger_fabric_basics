var app = require('./src/express');

var port = process.env.PORT || 3000;
    
app.listen(port, function(){
    console.log('Server ON in Port' + port);
})