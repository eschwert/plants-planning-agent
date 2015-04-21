var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');
var reasoner_module = require('./lib/Reasoner');
var parser_module = require('./lib/Parser');


var boards = [];
var reasoner = null;
var parser = null;

/*--------------- Express configuration goes here: -------------------*/
var app = express();
var port = process.env.PORT || 3301;
var host = process.env.HOST || "127.0.0.1";

app.use(
  function crossOrigin(req,res,next){
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers','Content-Type, Authorization, Content-Length, X-Requested-With');

    if('OPTIONS' == req.method){
        res.send(200);
    }
    else
        next();
  }
);
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.listen(port, host, function() {
  //configuration
  try {
    fs.readFile('lib/fakeBoards.json', function(err, data){
      if (err) throw err;
      
      boards = data.boards;

      //TODO: Here should be done all the HTTP requestes to the boards to obtain the RESTdesc descriptions
      //NB: I have to add the boardID => used to identify the directory (or the single FileName) contained
      //the RESTdesc descriptions for each board!!!

      reasoner = new reasoner_module.Reasoner(__dirname,  "eye");
      parser = new parser_module.Parser(__dirname);

      console.log("Server configured");
      console.log("Server listening to %s:%d", host, port);
    });
  } catch (e) {
    console.log("Error in reading file for configuration");
  }
});


/*--------------- HTTP Calls -------------------*/

var getEntryPoint = function(req, res) {
  console.log("EntryPoint");
  res.send({success:true});
}

var getPlanOnlyBoard = function(req, res){
  var boardID_required = req.params.boardID;
  //reasoner.generatePlanToKnowPlantInfo(boardID_required, function(){
    parser.readParserFile();
    //TODO
    res.send({success:true});
  //});
}


app.get("/", getEntryPoint);
app.get("/planOnlyBoard/:boardID", getPlanOnlyBoard);