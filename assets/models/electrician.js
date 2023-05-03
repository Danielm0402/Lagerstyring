
/*'
    elektriker 0..* <--> 0..* lagerbiler 
*/

export default class Electrician {
    constructor(name, vanKey) {
        this.name = name
        this.vanKey = vanKey
    }

    changeVanKey(newVanKey){
        this.vanKey = newVanKey
    }
    
}
