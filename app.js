//initial setup
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
let alert=require("alert");
const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/application_info",{UseNewUrlParser: true});
var num;
const listSchema={
  fname: String,
  lname: String,
  address:String,
  city:String,
  state:String,
  country:String,
  zip:Number,
  email:String,
  mobno:Number,
  branch:String,
  semester:Number,
  course:String,
  college:String,
}
const List=mongoose.model("List",listSchema);

//get
app.get("/",function(req,res){
    res.render("body");


});

app.get("/submitted_successfully",function(req,res){
  List.find({},function(err,arr){
    num=arr.length;
    res.render("submitted_successfully",{tot:num});
  });
});
app.get("/show",function(req,res){
  List.find({},function(err,cand){
    res.render("show",{candidates:cand});
  })

})
app.post("/",function(req,res){
  const firstname=req.body.fn;
  const lastname=req.body.ln;
  const addressname=req.body.add;
  const cityname=req.body.city;
  const statename=req.body.state;
  const countryname=req.body.country;
  const zipcode=req.body.zip;
  const emailadd=req.body.email;
  const mobnum=req.body.mob;
  const branchname=req.body.branch;
  const semesternum=req.body.sem;
  const coursename=req.body.course;
  const collegename=req.body.collname;
  const data=new List({
    fname:firstname,
    lname:lastname,
    address:addressname,
    city:cityname,
    state:statename,
    country:countryname,
    zip:zipcode,
    email:emailadd,
    mobno:mobnum,
    branch:branchname,
    semester:semesternum,
    course:coursename,
    college:collegename,
  });
  data.save();
  res.redirect("/submitted_successfully");

});








app.listen(3000, function() {
  console.log("Server started on port 3000");
});
