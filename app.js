const {Remarkable} = require('remarkable');
var remarkable_emoji = require('remarkable-emoji');
var md = new Remarkable('full', {
    html: true,
    typographer: true
  });

md.use(remarkable_emoji);

var fs = require('fs');

var express= require('express'),
app = express();

app.set("view engine", "ejs");

app.use(express.static(__dirname + '/public'));

app.get("/",function(req,res){
    res.render("index");
})

app.get("/blogs/:articlename", (req,res)=>{
    fs.readFile('public/pages/'+ req.params.articlename +'.md', 'utf8' ,(err, data) => {
        res.send((md.render(data)));
    });
})

app.listen(8000,'localhost',function(){
    console.log("app is running on: localhost:8000");
})