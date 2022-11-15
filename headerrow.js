class HeaderRow{
    constructor(contentarray){
        this.contentarray = [...contentarray]; 
    }

    getelement(i){
        if(i<this.contentarray.length){
            return this.contentarray[i]
        }
        else{
            throw 'the element you are trying to acess is out of range';  
        }
    }
}

module.exports = HeaderRow