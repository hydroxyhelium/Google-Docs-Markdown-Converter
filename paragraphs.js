// import { Line } from "./line.js";
// import { Link } from "./links.js";


var Line = require('./line.js'); 
var Link = require('./links.js'); 

class Paragraph{
    // this object added can be link or line 
    constructor(isList){
        this.array = [];   
        this.isList = isList;
    }

    appendobj(element){

        if(element instanceof Link){
            this.array.push(element)
        }
        else if(element instanceof Line){
            this.array.push(element)
        }
        else{
            throw 'Cannot append objects not of type Line or Link'; 
        }
    }

    getarray(){
        return this.array;
    }

    isBullet(){
        return this.isList
    }
}


module.exports = Paragraph