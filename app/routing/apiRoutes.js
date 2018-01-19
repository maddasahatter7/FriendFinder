
// A GET route with the url /api/friends. This will be used to display a JSON of all possible friends
// A POST routes /api/friends. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.
var friends = require('../data/friends.js');
var colors = require('colors');
var bodyParser = require("body-parser");


module.exports = function (app) {
    app.get('/api/friends', function (req, res) {
        res.json(friends);
    });

    app.post('/api/friends', function (req, res, friendsData) {

        var bestMatch = {
            name: "",
            photo: "",
            friendDifference: 1000
        };

        var userData = req.body;
        var userName = req.body.name;
        var userPhoto = req.body.photo;
        var userScores = userData.scores;

        var userTotalDifference;
        var friendsTotalDifference;
        var totalDifference;

        //loop through the friends data array of objects to get each friends scores
        JSON.stringify(friends);
        for (var i = 0; i < friends.length; i++) {
            console.log(colors.inverse.red("This is friends[i].name: " + friends[i].name));

            console.log(colors.inverse.green("This is UserScores: " + (userScores)));
            console.log(colors.inverse.blue("This is friends[i].scores: " + friends[i].scores));
            /*			console.log(colors.inverse.blue("This is userScores.length: " + userScores.length));*/
            friendsTotalDifference = 0;
            userTotalDifference = 0;
            var userTotalArray = [];

            userTotalArray.push(userScores)

            console.log(colors.inverse.red("This is userTotalArray: " + userTotalArray));
            // This turns array of strings into array of integers to sum up total for compatability // 
            var arrayOfNumber = friends[i].scores.map(Number);
            console.log(colors.inverse.cyan("This is test map for friend[i].scores: " + arrayOfNumber));
            //loop through that friends score and the users score and calculate the absolute difference between the two and push that to the total difference variable set above
            for (var j = 0; j < userScores.length; j++) {
                // function that generates value for friends total to compare compatability with user // 
                function friendTotals(total, num) {
                    return total + num;
                }
                // reduce method that saves friendsTotals function for compatability // 
                friendsTotalDifference = arrayOfNumber.reduce(friendTotals);
                console.log(colors.inverse("This is friends[i] total: " + friendsTotalDifference));
                // This turns array of strings into array of integers to sum up total for compatability // 
                var arrayOfNumbers = userScores.map(Number);
                console.log(colors.inverse.yellow("This is test map for userScores: " + arrayOfNumbers));
                // function that generates value for user total to compare compatablility with friends api // 
                function userTotals(total, num) {
                    return total + num;
                }
                // reduce method that saves user userTotals function for compatability // 
                userTotalDifference = arrayOfNumbers.reduce(userTotals);
                console.log(colors.inverse.red("This is  userTotal Scores added: " + userTotalDifference));

                // We calculate the difference between the scores and sum them into the totalDifference
                totalDifference = Math.abs(userTotalDifference - friendsTotalDifference);
                console.log(colors.inverse.blue("This is totalDifference: " + totalDifference));
                // If the sum of differences is less then the differences of the current "best match"
                if (totalDifference <= bestMatch.friendDifference) {

                    // Reset the bestMatch to be the new friend. 
                    bestMatch.name = friends[i].name;
                    bestMatch.photo = friends[i].photo;
                    bestMatch.friendDifference = totalDifference;
                }
            }
        }

        // Finally save the user's data to the database (this has to happen after the screening. otherwise,
        // the database will always return that the user is the user's best friend).

        console.log(colors.inverse.green("This is best match name: " + bestMatch.name));
        console.log(colors.inverse.green("This is best match photo: " + bestMatch.photo));
        console.log(colors.inverse.green("This is best match difference: " + bestMatch.friendDifference));

        friends.push(userData);



        // Return a JSON with the user's bestMatch. This will be used by the survey HTML in the next page. 
        res.json(bestMatch);

    });
};
