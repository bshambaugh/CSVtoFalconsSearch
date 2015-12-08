var fs = require('fs');
// var request = require('request');

var Secondfilename = 'ISP_SVG_Data_Links_Entry_Sheet-Definitions.csv';

// Asyncronous File reading with readFile
// (Based off of OKCoders Express Intro Video (https://www.youtube.com/watch?v=nwXwoibiuGI) )
// was not working.
// http://code.runnable.com/VVPFREu0oblSpIch/read-file-sync-for-node-js
 var D = fs.readFileSync(Secondfilename).toString();

 // Mozilla Developer Network Split String documentation
 // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split
 // Mozilla Developer Network Replace Documentation
 // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace

function splitString(stringToSplit, separator) {
  var arrayOfStrings = stringToSplit.split(separator);
   return arrayOfStrings;
}

var carrriageR = '\r\n';
var comma = ',';

console.log(splitString(D, carrriageR));
var L = splitString(D, carrriageR);

var K = [];
var B = [];
var C = [];

 for (var i = 0; i < L.length; i++) {
   var J = splitString(L[i], comma);
   B[i] = J[0];
   K[i] = J[J.length-1];
 //  J = 0;
 }

console.log(B);
console.log(K);
// diagnostic
var filename = 'ISP_text_csv.txt';
// out var filename2 = 'ISP_SVG_Data_Links_Entry_Sheet-Definitions.csv';
//var filename2 = 'ISP_SVG_Data_Links_Entry_Sheet-Definitions.csv';

// diagnostic
 var G = fs.readFileSync(filename).toString();
 // out var G = fs.readFileSync(filename2).toString();

 // I need to read in K and B to Strings...and then feed them to splitString to Arrays...

 //var H = splitString(G, carrriageR);
 // out console.log(splitString(G, carriageR));

//diagnostic
 //var K = ["Evolved Expendable Launch Vehicle", "Low Earth Orbit"];
//var K = [];
//diagnostic
// var B = ["EELV", "LEO"];
//var B = [];
//diagnostic
//var C = [];

/*
 for (var i = 0; i < H.length; i++) {
   var J = splitString(H[i], comma);
   K[i] = J[0];
   B[i] = J[J.length-1];
 //  J = 0;
 }

console.log(K);

*/

// out
/*
function splitString(stringToSplit, separator) {
  var arrayOfStrings = stringToSplit.split(separator);
   return arrayOfStrings;
}
*/

//diagnostic

function expandAbbreviations(E) {
 for (var j = 0; j < B.length; j++) {
      for (var i = 0; i < E.length; i++) {
          C[i] = E[i].replace(B[j],K[j]);
   }
      for (var i = 0; i < E.length; i++) {
        if (E[i] != C[i]) {
        E[i] = C[i];

        }
      }

 }
 return C;
}



//out
/*
var comma = ',';
var carriageR = '\r\n';
*/
//var carrriageR = '\r\n';

console.log(expandAbbreviations(splitString(G, comma)));
var T = expandAbbreviations(splitString(G, comma));

function addplusGET(T)
{
  for (var i = 0; i < T.length; i++) {
    var paramA = T[i].replace(/ /ig, '+');
    var paramB = paramA.replace(/\//ig, '{or}');
    getrequest(paramB);
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
  }, 2000)

setTimeout(function() {
  request('http://ws.nju.edu.cn/falcons/api/classsearch.jsp?query='+paramA, function (error, response, body){
       if (!error && response.statusCode == 200) {
  //        console.log(body);   // Show the HTML
          savetoFile(paramA, 'classsearch', body);
        }
    })
 }, 2000)

setTimeout(function() {
  request('http://ws.nju.edu.cn/falcons/api/whereis.jsp?uri='+paramA, function (error, response, body){
         if (!error && response.statusCode == 200) {
//            console.log(body);   // Show the HTML
            savetoFile(paramA, 'documentsearch', body);
          }
      })
 }, 2000)

}

// Nodejs Documentation (https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback)
// Inspiration from OKCoders Express Intro Video (https://www.youtube.com/watch?v=nwXwoibiuGI).
function savetoFile(paramA, searchroot, body) {

 fs.writeFile('./'+paramA+'-'+searchroot+'.rdf', body, function(err){
   if(err) throw err;
//   console.log('It\'s saved!');
 });

}
