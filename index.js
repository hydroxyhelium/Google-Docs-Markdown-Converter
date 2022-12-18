const {google} = require('googleapis');
const { content } = require('googleapis/build/src/apis/content');
const credentials = require('./polynomial-coda-368018-081283502f1c.json');

var Line = require('./line.js'); 
var Link = require('./links.js'); 
var Paragraph = require('./paragraphs.js');
const Table = require('./table');
var StructuralElementParsingFunction = require('./paragraphparse.js'); 
var tableObjectParsingFunction = require('./tableparse.js'); 
var convertbackParagraph = require('./convertParagraph.js');
var converBackTable = require('./convertTable.js')


// import {google} from "googleapis"
// import { content } from "googleapis/build/src/apis/content/index.d.ts";
// import {credentials} from "./polynomial-coda-368018-081283502f1c.json"; 


var Markdown = "" 


var Document = [] // Document is an Array of paragraph elements

const scopes = [
    'https://www.googleapis.com/auth/documents', 
];

const auth = new google.auth.JWT(
    credentials.client_email, null,
    credentials.private_key, scopes
);

const docs = google.docs({ version: "v1", auth});

resultarray = []


const res = docs.documents.get({
    documentId: '1Zcjqnid9njXQ137yQ-fF7E3VYvzYS7XDu-ayYbkdJ0M',
}).then((req)=>{
    doc = req.data

    //console.log(doc.title)
    contentarray = doc.body.content

    // StructuralElementParsingFunction(contentarray[0], Document)

    // contentarray.forEach((StructuralElement)=>{
    //     StructuralElementParsingFunction(StructuralElement, Document)
    // })

    // table is at index 6. 
    contentarray.forEach((e)=>{
        if(e.hasOwnProperty('table')){
            tableObjectParsingFunction(e["table"], Document)
        }
        else{
            StructuralElementParsingFunction(e, Document)
        }
    })
    
    var tempstring = ""; 

    Document.forEach((e)=>{

        if(e.constructor.name=="Table"){
            tempstring += converBackTable(e,"");
        }
        tempstring += convertbackParagraph(e, ""); 
    })

    console.log(tempstring)
})

// convertbackDocument = (document, markdown)=>{
    
//     //console.log(document)
//     temp = ""

//     document.forEach((element)=>{
//         //console.log(convertbackParagraph(element, markdown))
//         //return
//         // console.log(convertbackParagraph(element, markdown))
//         temp += convertbackParagraph(element, markdown)
//     })

//     return temp
// }


// convertbackParagraph = (paragraphobj, markdown)=>{

//     contentarray = paragraphobj.getarray()

//     contentarray.forEach((e)=>{

//         if(e instanceof Line){
//             markdown += addedHeading(e)
//             markdown += addedContent(e)
//         }
//         else if(e instanceof Link){
//             //console.log(e)
//             markdown += addedHeading(e)
//             markdown += addedContentLink(e)
//         }

//     })

//     return markdown; 
// }


// addedHeading = (element)=>{

//     var temp = ""

//     if(element.heading == 1){
//         temp += "# "; 
//     }
//     else if(element.heading == 2){
//         temp += "## "
//     }
//     else if(element.heading == 3){
//         temp += "### "; 
//     }
    
//     return temp; 
// }

// addedContent = (element) => {
//     var temp = ""

//     if(element.bold){
//         temp += "**"
//         temp += element.text; 
//         temp += "** "; 
//     }
//     else{
//         temp += element.text; 
//     }

//     return temp
// }

// addedContentLink = (element) => {

//     var temp = ""

//     if(element.bold){
//         temp += "**["
//         temp += element.text
//         temp += "]("
//         temp += element.link.url
//         temp += ")"
//         temp += "** "
//     }
//     else{ 
//         temp += "["
//         temp += element.text
//         temp += "]("
//         temp += element.link.url
//         temp += ")"
//     }

//     return temp
// }

// heading row.
// row1, row2, row3, row4, ...... 
