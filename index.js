const  express = require ("express");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");
const { result } = require("lodash");

const app = express();

let Posts = [];

const aboutMe = "Hi, there I am SAURABH SONI ,Electronics And Communication Engineering Student at Madan Mohan Malaviya University of Technology Gorakhpur.Currently i am working as an IOT developer at CODEBUGGED an AI based startup at my University";
const contact = "Hey, There you can contact me on 7234869244";


app.set ('view engine','ejs');

app.use(express.urlencoded({extended:false}));
app.use(express.static('public'));

mongoose.connect("mongodb+srv://soni_cluster:98074701@cluster0.b7ycx.mongodb.net/PROJECTS",{useNewUrlParser :true ,useUnifiedTopology: true});

const projectSchema = {
    title : String,
    details : String
};

const Project = mongoose.model("Project",projectSchema);

const project1 = new Project({
    title:"IOT",
    details: "Will chnage it later on"
});

const project2 = new Project({
    title:"IOT",
    details: "Will chnage it later on definately"
});

const project3 = new Project({
    title:"IOT",
    details: "Will chnage it later on , ho jayega bro"
});

const PROJECTS = [project1,project2,project3];

const listSchema = {
    name : String,
    items : projectSchema
};

const List = mongoose.model("List",listSchema);



app.get("/", function(req,res){

    Project.find({},function(err,result){
        if(result.length === 0)
        {
          
         Project.insertMany(PROJECTS,function(err){
         if (err){
           console.log(err);
        }
         else{
           console.log("data inserted succesfully");
        }
      });
         res.redirect("/");
        }else{
        res.render('list', {aboutMe:aboutMe ,Posts:result});
        }
    });
});


// app.get("/", function(req,res){
//     res.render('Home', {aboutMe:aboutMe ,Posts:Posts});
// });

app.get("/contact", function(req,res){
    res.render('Contact',{contact:contact});
});


app.get("/About", function(req,res){
    res.render('About', {aboutMe:aboutMe});
});


app.get("/Compose",function(req,res){
    res.render('Compose');
});


// app.post("/Compose",function(req,res){
 
// const ToPost ={
//       Titleof:  req.body.titlebody,
//       Content : req.body.comment
//   };

//   Posts.push(ToPost);
//   res.redirect("/");

// });

app.post("/",function(req,res){
   const projectname = req.body.newpost;

   const item = new Project({
       title : "new one",
       details: projectname
   });
   item.save();

   res.redirect("/");
});

app.post("/delete", function(req,res){
   const postId = req.body.checkBox;

 Project.findByIdAndRemove(postId,function(err){
  if(err){
      console.log(err);
  }
  else{
   console.log("deleted successfully");
   res.redirect("/");
  }
});

});

// app.get("/Posts/:postName",function(req,res){
//   const  titleNAme = _.lowerCase(req.params.postName);

//   Posts.forEach(function(post){
//    const titleNAME = _.lowerCase(post.Titleof);
  
//    if(titleNAme === titleNAME){
//        res.render('Post',{
//         newTitle :post.Titleof,
//         newContent : post.Content
//        });
//     }
//    });
//  });

app.get("/:UrlName",function(req,res){
    const URL =req.params.UrlName;
    const  list = new List({
        name : URL,
        items : PROJECTS 
    });
    list.save(); 
});


app.listen(process.env.PORT || 3000,function(){
    console.log("server started ");
});