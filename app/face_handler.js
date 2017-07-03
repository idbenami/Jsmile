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
};

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
                callback({numbers: { sum:getNumOfPeople(body), 
                                     men:getAmountOfMen(body), 
                                     women:getAmountOfWomen(body) }, 
                          commonEmotion: getCommonEmotion(body)});
            }
        });
    });
};

function getFacesArray(picJson) {
    return (picJson.faces);
}

function getNumOfPeople(picJson) {

    // Return the number of faces
    return (getFacesArray(picJson).length);
}

function numOfGlasses(json) {
    var faces = getFacesArray(json);
    var nNumOfGlasses = 0;
    var curr;

    for (var i = 0; i < faces.length; i++) {
            curr = faces[i].glass.value;

        if (curr != "None") {
            nNumOfGlasses++;
        }
    }

    return nNumOfGlasses;
}

function getAmountOfMen(json) {
    var faces = getFacesArray(json);
    var nNumOfMen = 0;
    var curr;

    for (var i = 0; i < faces.length; i++) {
            curr = faces[i].gender.value;

        if (curr == "Male") {
            nNumOfMen++;
        }
    }
    return nNumOfMen;
}


function getAmountOfWomen(json) {
    var faces = getFacesArray(json);
    var nNumOfWomen = 0;
    var curr;

    for (var i = 0; i < faces.length; i++) {
            curr = faces[i].gender.value;

        if (curr == "Female") {
            nNumOfWomen++;
        }
    }
    return nNumOfWomen;
}

function getAverage(json) {
    var faces = getFacesArray(json);
    var nSumOfAges = 0;
    var curr;
    var nCurrAge;
    var nAverageAge;

    for (var i =0; i < faces.length; i++) {
        curr = faces[i].age.value;
        nCurrAge = ParseInt(curr);
        nSumOfAges += curr;
    }

    nAverageAge = nSumOfAges / faces.length;

    return nAverageAge;
}

function getCommonEmotion(json) {
    var faces = getFacesArray(json);
    var emotionsAvg = { "sadness": 0.00,
                        "neutral": 0.00,
                        "disgust": 0.00,
                        "anger": 0.00,
                        "surprise": 0.00,
                        "fear": 0.00,
                        "happiness": 0.00} ;

    for (var i =0; i < faces.length; i++) {
        for (var emotion in faces[i].attributes.emotions) {
            emotionAvg[emotion] += emotion;
        }
    }

    var maxValue = -999;
    var maxEmotion = null;
    for (var emotion in faces[i].attributes.emotions) {
            if(emotionAvg[emotion] > maxValue) {
                maxValue = emotionAvg[emotion];
                maxEmotion = emotion;
            }
    }

    return maxEmotion;
}