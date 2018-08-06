var express     = require("express"),
    mongoose    = require("mongoose"),
    bodyParser  = require("body-parser"),
    app         = express();
mongoose.connect("mongodb://localhost:27017/restful_blog_app", {useNewUrlParser: true});

app.set("view engine", "ejs");
app.use(express.static("public")); // Use the following code to serve images, CSS files, and JavaScript files in a directory named public
app.use(bodyParser.urlencoded({extended: true}));

//MongoDB Schema
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});

//Compile into Model
var Blog = mongoose.model("Blog",blogSchema);

//Creating sample data
// Blog.create({
//     title: "Test Blog",
//     image: "https://bit.ly/2MgRARF",
//     body: "First Blog Post"
// });

//RESTful Routes
app.get("/",function(req,res){
    res.redirect("/blogs");
});

//GET - INDEX Route
//Display a list of all blogs
app.get("/blogs",function(req,res){
    Blog.find({},function(err,blogs){
        if(err){
            console.log("Error loading blogs!");
        } else{
            res.render("index.ejs", {blogs: blogs}); //{name: data} Passing in a variable named blogs, which is pulled from Blog.find[...]
        }
    });
});
//GET - NEW Route
//Displays form to make a new blog
app.get("/blogs/new",function(req,res){
    res.render("new.ejs");
});
//POST - CREATE Route
//Add new Blog to DB
app.post("/blogs",function(req,res){
    Blog.create(req.body.blog, function(err, newBlog){
        if(err){
            console.log("Error creating new blog post");
            res.render("new.ejs");
        } else {
            res.redirect("/blogs");
        }
    });
});

//Error Page
app.get("/*",function(req,res){
    res.send("Error loading the page");
});

//Start Server
app.listen(5500,function(){
    console.log("RESTful Blog Server Started!");
    console.log("Go to 'localhost:5500'");
});