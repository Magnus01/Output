/*
        *File: app.js
        *Author: Asad Memon / Osman Ali Mian
        *Last Modified: 5th June 2014
        *Revised on: 30th June 2014 (Introduced Express-Brute for Bruteforce protection)
*/




var express = require('express');
var http = require('http');
var arr = require('./compilers');
var sandBox = require('./DockerSandbox');
var bodyParser = require('body-parser');
var app = express();
var server = http.createServer(app);
var port=8080;




app.use(express.static(__dirname));
app.use(bodyParser());

app.all('*', function(req, res, next)
{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
});

function random(size) {
    //returns a crypto-safe random
    return require("crypto").randomBytes(size).toString('hex');
}

function getFilesizeInBytes(filename) {
    var stats = fs.statSync(filename)
    var fileSizeInBytes = stats["size"]
    return fileSizeInBytes
}

app.post('/compile',function(req, res)
{

    var language = req.body.language;

    var virtualmachineVar = "python"
    if (language === 4)  {
        virtualmachineVar = "javascript"
    }
    else {language === 0}

    var code = req.body.code;
    var stdin = req.body.stdin;

    var folder= 'temp/' + random(10); //folder in which the temporary folder will be saved
    var path=__dirname+"/"; //current working path
    var vm_name=virtualmachineVar; //name of virtual machine that we want to execute
    //we need a python Scientifc library tag
    //we need a react js tag
    //we need a virtual reality tag
    //we need a c++ tag

    var timeout_value=20;//Timeout Value, In Seconds

    //details of this are present in DockerSandbox.js
    var sandboxType =
        new sandBox(
            timeout_value,
            path,
            folder,
            vm_name,
            //INSTEAD OF VM NAME WE NEED TO HAVE LANGUAGE THAT WILL TAKE ITS place (libraries)
            //language,
            arr.compilerArray[language][0],
            arr.compilerArray[language][1],
            code,
            arr.compilerArray[language][2],
            arr.compilerArray[language][3],
            arr.compilerArray[language][4],
            stdin);

    var url = "https://compilebox.net/" + folder + "/myfig.png";
    //data will contain the output of the compiled/interpreted code
    //the result maybe normal program output, list of error messages or a Timeout error
    sandboxType.run(function(data,exec_time,err)
    {
        //console.log("Data: received: "+ data)

    	res.send({folder: url, output:data, langid: language,code:code, errors:err, time:exec_time});
    });

});


app.get('/', function(req, res)
{
    res.sendfile("./index.html");
});

console.log("Listening at "+port)
server.listen(port);
