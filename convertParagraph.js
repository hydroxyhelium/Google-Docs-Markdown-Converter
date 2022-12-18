var Line = require('./line.js')
var Link = require('./links.js')
var Paragraph = require('./paragraphs.js')


convertbackParagraph = (paragraphobj, markdown)=>{

    
    if(paragraphobj.constructor.name!=="Table" && paragraphobj.isBullet()){
        markdown += "- "; 
    }

    if(paragraphobj.constructor.name === "Paragraph"){
        contentarray=paragraphobj["array"]
    }

    contentarray.forEach((e)=>{

        if(e instanceof Line){
            markdown += addedHeading(e)
            markdown += addedContent(e)
        }
        else if(e instanceof Link){
            // console.log(e)
            markdown += addedHeading(e)
            markdown += addedContentLink(e)
        }
    })

    return markdown; 
}

addedHeading = (element)=>{

    var temp = ""

    

    if(element.heading == 1 && (element.text!==" " && element.text!=="\n") ){
        temp += "# "; 
    }
    else if(element.heading == 2 && (element.text!==" " && element.text!=="\n")){
        console.log(element.text!=="\n")
        temp += "## "
    }
    else if(element.heading == 3 && (element.text!==" " && element.text!=="\n")){
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

module.exports = convertbackParagraph; 