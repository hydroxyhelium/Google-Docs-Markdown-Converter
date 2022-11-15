const {google} = require('googleapis');
const { content } = require('googleapis/build/src/apis/content');
const credentials = require('./polynomial-coda-368018-081283502f1c.json');

var Line = require('./line.js'); 
var Link = require('./links.js'); 
var Paragraph = require('./paragraphs.js')

// import {google} from "googleapis"
// import { content } from "googleapis/build/src/apis/content/index.d.ts";
// import {credentials} from "./polynomial-coda-368018-081283502f1c.json"; 

const heading1_cutoff = 23
const heading2_cutoff = 18
const heading3_cutoff = 15
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

    StructuralElementParsingFunction(contentarray[0], Document)
    contentarray.forEach((StructuralElement)=>{
        StructuralElementParsingFunction(StructuralElement, Document)
    })

    console.log(convertbackDocument(Document, Markdown))

})

// thisSession.hasOwnProperty('merchant_id')

StructuralElementParsingFunction = (element, document)=>{

    if(isParagraph(element)){
        var paragraphobj = element["paragraph"]
        
        var temp = ParagraphObjectParsingFunction(paragraphobj)
        document.push(temp)
    }
    // is paragraph 
      // does it have any link

}

ParagraphObjectParsingFunction = (element)=>{

    var ParagraphElementArray = element["elements"]
    var paragraph = new Paragraph()
    
    ParagraphElementArray.forEach((paragraphelement)=>{
        //console.log(paragraphelement)
        ParagraphElementParsingFunction(paragraphelement, paragraph); 
    })

    return paragraph;
}

ParagraphElementParsingFunction = (ParagraphElement, paragraph)=>{

    if(ParagraphElement.hasOwnProperty('textRun')){
        var content = ParagraphElement["textRun"]["content"]
        //console.log("hi")
        //console.log(content)
        var heading = checkHeading(ParagraphElement['textRun'])
        var bold = checkbold(ParagraphElement['textRun'])

        if (checkLink(ParagraphElement['textRun'])){
            var link = ParagraphElement['textRun']['textStyle']['link']
            var FinalElement = new Link(content, link, heading, bold)
        }
        else{
            
            FinalElement = new Line(content, heading, bold)
        }

        paragraph.appendobj(FinalElement)
    }
    else if(ParagraphElement.hasOwnProperty('richLink')){
        console.log("rich link found!") 
    }

}


isParagraph =(element)=>{
    if(element.hasOwnProperty("paragraph")){
        return true;
    }
    return false; 
}


checkLink = (textRun)=>{
    textstyle = textRun['textStyle']

    if(textRun['textStyle'].hasOwnProperty('link')){
        return true
    }
    else{
        return false
    }
}


// this is a function that returns the heading of the object. 
checkHeading = (textRun)=>{
    //console.log(textRun)
    var fontsize = textRun["textStyle"]["fontSize"]["magnitude"]

    if(fontsize>=heading1_cutoff){
        return 1; 
    }
    else if(fontsize>=heading2_cutoff){
        return 2; 
    }
    else if(fontsize>=heading3_cutoff){
        return 3; 
    }
    else{
        return 4; 
    }
}

// checks if the text being parsed is bold or not
checkbold = (textRun)=>{

    // console.log(textRun["textStyle"]["weightedFontFamily"])
    if(! textRun["textStyle"].hasOwnProperty("weightedFontFamily"))
    {
        return false; 
    }
    var weight = textRun["textStyle"]["weightedFontFamily"]["weight"]

    if(weight>400){
        return true;
    }

}



parseDocument = (document)=>{

    document.forEach((element)=>{

        if(element instanceof Paragraph){


        }
    })
}


convertbackDocument = (document, markdown)=>{
    
    //console.log(document)
    temp = ""

    document.forEach((element)=>{
        //console.log(convertbackParagraph(element, markdown))
        //return
        // console.log(convertbackParagraph(element, markdown))
        temp += convertbackParagraph(element, markdown)
    })

    return temp
}


convertbackParagraph = (paragraphobj, markdown)=>{

    contentarray = paragraphobj.getarray()

    contentarray.forEach((e)=>{

        if(e instanceof Line){
            markdown += addedHeading(e)
            markdown += addedContent(e)
        }
        else if(e instanceof Link){
            //console.log(e)
            markdown += addedHeading(e)
            markdown += addedContentLink(e)
        }

    })

    return markdown; 
}


addedHeading = (element)=>{

    var temp = ""

    if(element.heading == 1){
        temp += "# "; 
    }
    else if(element.heading == 2){
        temp += "## "
    }
    else if(element.heading == 3){
        temp += "### "; 
    }
    
    return temp; 
}

addedContent = (element) => {
    var temp = ""

    if(element.bold){
        temp += "**"
        temp += element.text; 
        temp += "** "; 
    }
    else{
        temp += element.text; 
    }

    return temp
}

addedContentLink = (element) => {

    var temp = ""

    if(element.bold){
        temp += "**["
        temp += element.text
        temp += "]("
        temp += element.link.url
        temp += ")"
        temp += "** "
    }
    else{ 
        temp += "["
        temp += element.text
        temp += "]("
        temp += element.link.url
        temp += ")"
    }

    return temp
}



