const request = require('request');
const path = require('path');
const fs = require('fs');

// Configure the request
var options = {
    url: 'https://api-us.faceplusplus.com/facepp/v3/detect',
    method: 'POST',
    headers: {},
    form: { api_key: 'wCdTMSffp5KbwAo68NO6YVK8bz5hFim9', 
            api_secret: 'LYV0oGe-SBy1fGQaxRhY_WpdE4dLRMRP', 
            return_attributes: 'gender,age,smiling,glass,headpose,blur,eyestatus,emotion,facequality,ethnicity',
            image_base64: ''}
}

// Start the request
module.exports.faceDetect = function(imageName, callback) {
    fs.readFile(path.join(__dirname, 'pictures', imageName), function(err, data) {
        if (err) throw err;

        // Encode to base64
        options.form.image_base64 = new Buffer(data, 'binary').toString('base64');

        console.log('send request');

        request(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                // Print out the response body
                console.log('recieved data');
                callback(body);
            }
        });
    });
}