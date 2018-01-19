var path = require("path");
// route to survey // 


// Routes
// =============================================================
module.exports = function (app) {
    // HTML routes for pages 
    // if no route matches or given use this route // 
    app.get("/survey", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/survey.html"));
    });
    app.use("/", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/home.html"));
    });
    // route to survery // 

};