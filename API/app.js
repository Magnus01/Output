/*
        *File: app.js
        *Author: Asad Memon / Osman Ali Mian
        *Last Modified: 5th June 2014
        *Revised on: 30th June 2014 (Introduced Express-Brute for Bruteforce protection)
*/


// added 13:03 to work with the gist-function for finding files by exxt.
var path = require('path')
var fs = require('fs')
//


var express = require('express');

var http = require('http');
var arr = require('./compilers');
var sandBox = require('./DockerSandbox');
var bodyParser = require('body-parser');
var app = express();
var server = http.createServer(app);
var port=3000;


var ExpressBrute = require('express-brute');
var store = new ExpressBrute.MemoryStore(); // stores state locally, don't use this in production
var bruteforce = new ExpressBrute(store,{
    freeRetries: 50,
    lifetime: 3600
});

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


// From GIST, see browser.
function recFindByExt(base,ext,files,result)
{
    files = files || fs.readdirSync(base)
    result = result || []

    files.forEach(
        function (file) {
            var newbase = path.join(base,file)
            if ( fs.statSync(newbase).isDirectory() )
            {
                result = recFindByExt(newbase,ext,fs.readdirSync(newbase),result)
            }
            else
            {
                if ( file.substr(-1*(ext.length+1)) == '.' + ext )
                {
                    result.push(newbase)
                }
            }
        }
    )
    return result
}


app.post('/compile',bruteforce.prevent,function(req, res)
{

    var language = req.body.language;


    var code = req.body.code;
    var unit_test = req.body.unit_test;


    //ADD ONTO UNIT TEST TO CODE VARABILE


    var stdin = req.body.stdin;

    var folder= 'temp/' + random(10); //folder in which the temporary folder will be saved
    var path=__dirname+"/"; //current working path
    var vm_name='virtual_machine'; //name of virtual machine that we want to execute
    var timeout_value=10;//Timeout Value, In Seconds

    //details of this are present in DockerSandbox.js
    var sandboxType = new sandBox(
        timeout_value,
        path,
        folder,
        vm_name,
        //  COMPILER NAME
        arr.compilerArray[language][0],

//  file_name,
//         python
        arr.compilerArray[language][1],

        // code,
        code,

        // unit_test
        unit_test,

        // output_command,
        // BLANK
        arr.compilerArray[language][2],

        // languageName,
        // Python
        arr.compilerArray[language][3],

        // e_arguments,
        //blank
        arr.compilerArray[language][4],

        // stdin_data,
        stdin,


        // unit_file_name
        // unit_test.py
        arr.compilerArray[language][5]
    );


var url = "https://compilebox.net/" + folder + "/myfig.png";
    //data will contain the output of the compiled/interpreted code
    //the result maybe normal program output, list of error messages or a Timeout error
    sandboxType.run(function(data,exec_time,err)
    {
        console.log("Data: received: "+ data,exec_time,err)
        // pick out images here, using regex ?, That way we can return them straight if they are found,
        // possibly as a list of images, if there are multiple.

        //var tmp_loc = something_from_script  (path + folder)
        //var images = recFindByExt(tmp_loc, 'jpg') //should be possible to res.send this list now.
        res.send({Image: url, output:data, langid: language,code:code, unit_test:unit_test, errors:err, time:exec_time});
    });

});


app.get('/', function(req, res)
{
    res.sendfile("./index.html");
});

console.log("Listening at "+port)
server.listen(port);
