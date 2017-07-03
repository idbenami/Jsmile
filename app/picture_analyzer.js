const face = require("./face_handler");


module.exports.analyze = function(img, callback) {

    // Saving the image
    img.mv('./app/pictures/' + img.name, function(err) {
        if (err) {
            console.log(err);
            callback(null, "couldn't save file");
        } else {
            console.log("the photo was saved!");
            var picDesc = "";

            // Calling the face detection
            face.faceDetect(img.name, function(json) {
                // If there are people in the picture
                if (json.numbers.sum > 0) {
                    picDesc += "There are " + json.numbers.sum + " people in the picture: " + json.numbers.men + " of them" +
                        " are men, and " + json.numbers.women + " are women. It seems that the most common emotion is " +
                        json.commonEmotion + ".";
                }

                callback(picDesc);
            });
        }
    });


}