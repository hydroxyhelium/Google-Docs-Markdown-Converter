var Table = require("./table");
var Row = require("./row.js"); 
var Cell = require("./cell.js"); 
var StructuralElementParsingFunction = require("./paragraphparse.js");


tableObjectParsingFunction = (element, document)=>{ 
    var table = new Table()
    var tablerowobjects = element["tableRows"]; 


    tablerowobjects.forEach((e)=>{
        var temp = tableRowParsingFunction(e)
        table.push(temp);
    })
    
    document.push(table)
}

tableRowParsingFunction = (element)=>{
    var rowelement = new Row(); 
    var tablecellarray = element["tableCells"]

    tablecellarray.forEach((e)=>{
        rowelement.push(tableCellParsingFunction(e))
    })

    return rowelement; 
}

tableCellParsingFunction = (element)=>{

    var cell = []
    var StructuralElementArray = element["content"]

    StructuralElementArray.forEach((e)=>{
        StructuralElementParsingFunction(e, cell)
    })

    return new Cell(cell); 
}


module.exports = tableObjectParsingFunction; 