var Line = require('./line.js')
var Link = require('./links.js')
var Paragraph = require('./paragraphs.js')

const heading1_cutoff = 23;
const heading2_cutoff = 18;
const heading3_cutoff = 15;

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

isTable = (element)=>{
    if (element.hasOwnProperty("table")){
        return true; 
    }
    else{ 
        return false; 
    }
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

module.exports = StructuralElementParsingFunction; 