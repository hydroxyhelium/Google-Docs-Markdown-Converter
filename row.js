class Row{
    constructor(contentarray){
        if(contentarray){
            this.contentarray = [...contentarray]; 
        }
        else{
            this.contentarray = []; 
        }

    }

    getelement(i){
        if(i<this.contentarray.length){
            return this.contentarray[i]
        }
        else{
            throw 'the element you are trying to acess is out of range';  
        }
    }

    push(element){
        this.contentarray.push(element); 
    }
}

module.exports = Row