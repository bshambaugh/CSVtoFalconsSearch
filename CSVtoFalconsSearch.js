var fs = require('fs');
var request = require('request');

// Set the program to read in from the command line.
// Based off of OKCoders Express Intro Video (https://www.youtube.com/watch?v=nwXwoibiuGI).
var filename = process.argv[2];

// Based off of OKCoders Express Intro Video (https://www.youtube.com/watch?v=nwXwoibiuGI).
fs.readFile(filename, function(err, data){
  if(err) {
    console.log("Unable to read file "+filename);
  } else {
    splitStringandReq(data.toString(),comma);
  }
});

// Mozilla Developer Network Split String documentation
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split
// Mozilla Developer Network Replace Documentation
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace

var comma = ',';

function splitStringandReq(stringToSplit, separator) {
  var arrayOfStrings = stringToSplit.split(separator);
//  var paramA = arrayOfStrings[0].replace(/ /ig, '+');
//  getrequest(paramA);
  for (var i = 0; i < arrayOfStrings.length; i++) {
     var paramA = arrayOfStrings[i].replace(/ /ig, '+');
      getrequest(paramA);
   }
}

// Based Node Request Module
// https://www.npmjs.com/package/request
// Thanks David Walsh for the Link! https://davidwalsh.name/nodejs-http-request
// Calls to Falcons Based off API documentation:
// http://ws.nju.edu.cn/falcons/api/

function getrequest(paramA) {

 setTimeout(function() {
  request('http://ws.nju.edu.cn/falcons/api/objectsearch.jsp?query='+paramA, function (error, response, body){
     if (!error && response.statusCode == 200) {
//        console.log(body);   // Show the HTML
        savetoFile(paramA, 'objectsearch', body);
      }
    })
  }, 1000)

setTimeout(function() {
  request('http://ws.nju.edu.cn/falcons/api/classsearch.jsp?query='+paramA, function (error, response, body){
       if (!error && response.statusCode == 200) {
  //        console.log(body);   // Show the HTML
          savetoFile(paramA, 'classsearch', body);
        }
    })
 }, 1000)

setTimeout(function() {
  request('http://ws.nju.edu.cn/falcons/api/whereis.jsp?uri='+paramA, function (error, response, body){
         if (!error && response.statusCode == 200) {
//            console.log(body);   // Show the HTML
            savetoFile(paramA, 'documentsearch', body);
          }
      })
 }, 1000)

}

// Nodejs Documentation (https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback)
// Inspiration from OKCoders Express Intro Video (https://www.youtube.com/watch?v=nwXwoibiuGI).
function savetoFile(paramA, searchroot, body) {

 fs.writeFile('./'+paramA+'-'+searchroot+'.rdf', body, function(err){
   if(err) throw err;
//   console.log('It\'s saved!');
 });

}
