var express = require("express");
var app = express();
//This will tell Express to serve the contents of the public directory
app.use(express.static("public"));
//Now by default res.render will expect an ejs file and we can leave the .ejs tag off
app.set("view engine", "ejs"); 
//Home
app.get("/",function(req,res){
    res.render("home.ejs");
})


app.get("/love/:thing", function(req,res){
    var thing = req.params.thing;
    res.render("love.ejs", {thingInput: thing});
});

app.get("/posts", function(req, res){
    var posts = [
        {title: "Post 1", author: "John"},
        {title: "Post 2", author: "Doe"},
        {title: "Post 3", author: "Joe"}
    ];
    res.render("posts.ejs", {posts: posts});
});
//Start Server
app.listen(5500,function(req,res){
    console.log("Server Started!");
    console.log("Go to 'localhost:5500'");
});