var convertbackParagraph = require('./convertParagraph.js'); 
var Table = require('./table.js')
var Row = require('./row.js')
var Cell = require('./cell.js')


// this must append to markdown and return that object. 
converBackTable = (tableObject, markdown)=>{
    var tempstring = "<table> "
    var rowsArray = tableObject.getarray();
    
    rowsArray.forEach((e)=>{
        tempstring += convertBackRow(e)
    })

    tempstring += " </table> \n"
    markdown += tempstring; 

    return markdown; 
}

convertBackRow = (rowobj)=>{
    var tempstring = "<tr> "
    cellarray = rowobj.getarray(); 

    cellarray.forEach((e)=>{
        tempstring += convertBackCell(e)
    })

    tempstring += " </tr> \n"; 

    return tempstring 
}

convertBackCell = (cellobj)=>{
    var tempstring = "<td> ";
    
    var parastring = ""; 

    var paraobjarray = cellobj.getarray()

    paraobjarray.forEach((element)=>{
        parastring += convertbackParagraph(element, ""); 
    })

    parastring += " </td> \n"

    return parastring; 
}

module.exports = converBackTable