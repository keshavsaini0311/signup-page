const express = require('express');
const app=express();
const request = require('request');
const bodyparser=require("body-parser");
const https=require("https");
const PORT = process.env.PORT || 3000;
app.use(bodyparser.urlencoded({extended:true}));

app.use(express.static("public"));

app.get("/",function(request,response){
    response.sendFile(__dirname+"/signup.html");
})

app.post("/",function(req,res){
     var firstName=req.body.Fname;
     var lastName=req.body.Lname;
     var email=req.body.email;
     var password=req.body.password;

     var data={
        members:[{
            email_address:email,
            status:"subscribed",
            merge_fields:{
                FNAME:firstName,
                LNAME:lastName,
            }
        }]
     };
     const jsondata=JSON.stringify(data);
     console.log(jsondata);
     const url="https://us17.api.mailchimp.com/3.0/lists/d62367fe06/";
     const options={
        method:"POST",
        auth:"keshav1:82b6db3c106f6d4228fa778238d6df53-us17",
     }
    const request= https.request(url,options,function(response){

        if(response.statusCode===200){
            res.sendFile(__dirname+"/success.html");
        }else{
            res.sendFile(__dirname+"/failure.html");
        }

        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
     })
     request.write(jsondata);
     request.end();

})

app.post("/failure", function(req,res){
    res.redirect("/");
});


app.listen(PORT,function(){
    console.log("server hosted on port 3000");  
});

//API Keys
//mailchimp
//82b6db3c106f6d4228fa778238d6df53-us17


//list id
//d62367fe06