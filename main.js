const express = require('express');
const path = require('path');
const app = express();
const fileUpload = require('express-fileupload');

app.use("/api", express.static(path.join(__dirname, "public")));
app.use(fileUpload());
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, "/public/views/index.html"));
});

app.post('/photo', function(req, res) {
  console.log("recieved a photo");
})
app.listen(3000, function () {
  console.log('App listening on port 3000!')
});