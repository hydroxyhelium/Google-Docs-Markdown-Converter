var Row = require('./row.js'); 
var HeaderRow = require('./headerrow.js')

class Table{
    // rows is an array of headerrows and row
    constructor(rows){
        this.rows = []

        if(rows){
            rows.forEach((element)=>{

                if(element instanceof Row){
                    this.rows.push(element);
                }
                else if(element instanceof HeaderRow){
                    this.rows.push(element)
                }
                else{ 
                    throw 'cannot push element not of type Row or HeaderRow'; 
                }
            })

        }
    }

    getarray(){
        return [...this.rows]
    }

    getelement(i){

        if(i<this.rows.length){
            return this.rows[i]
        }
        else{
            throw 'the element you are trying to acess is out of range';  
        }
    }

    push(row){
        this.rows.push(row);
    }
}

module.exports = Table; 