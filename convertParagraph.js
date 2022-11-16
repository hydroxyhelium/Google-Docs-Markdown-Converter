var Line = require('./line.js')
var Link = require('./links.js')
var Paragraph = require('./paragraphs.js')


convertbackParagraph = (paragraphobj, markdown)=>{

    contentarray = paragraphobj.getarray()
    
    if(paragraphobj.isBullet()){
        markdown += "- "; 
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

module.exports = convertbackParagraph; 