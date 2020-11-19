var express = require('express');
var app = express();

var handlebars = require('express-handlebars').create({defaultLayout:'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');


var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.set('port', 9191);


app.get('/',function(req,res){
	
 var qParams = [];
 for (var p in req.query){
 qParams.push({'name':p,'value':req.query[p]})
 }
 var context = {};
 context.urlParam = qParams;
 
res.render('get.handlebars',context);
});

app.post('/',function(req,res){
	

var qParams1 = [];
 for (var p in req.body){
 qParams1.push({'name':p,'value':req.body[p]})
 }
 console.log(qParams1);
 console.log(req.body);
 var context = {};
 context.bodyParam = qParams1;
 
 
 var qParams2 = [];
 for (var p in req.query){
 qParams2.push({'name':p,'value':req.query[p]})
 }

 context.urlParam = qParams2;
 res.render('post.handlebars',context);
});


app.use(function(req,res){
// res.type('text/plain');
 res.status(404);
 //res.send('404 - Not Found');
 res.render('404.handlebars');
});
app.use(function(err, req, res, next){
 console.error(err.stack);
// res.type('plain/text');
 res.status(500);
// res.send('500 - Server Error');
res.render('500.handlebars');
});
app.listen(app.get('port'), function(){
 console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
