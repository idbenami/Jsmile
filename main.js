const express = require('express');
const path = require('path');
const faceAnalyze = require('./app/picture_analyzer.js');
const faceReq = require('./app/face_handler.js');
var answer = "";
const app = express();
const fileUpload = require('express-fileupload');

app.use("/api", express.static(path.join(__dirname, "public")));
app.use(fileUpload());
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, "/public/views/index.html"));
});


app.post('/photo', function(req, res) {
  console.log("recieved a photo");

  faceAnalyze.analyze(req.files.file, function(desc, err) {
    // If there isn't an error
    if (desc && !err) {
      res.json(desc);
      answer = desc;
    } else {
      console.log(err);
      res.status(400);
    }
  });

});

app.get('/answer', function(req, res) {
  res.send(answer);
})

app.listen(3000, function () {
    console.log('App listening on port 3000!')
});