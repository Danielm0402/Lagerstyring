
/*'
    elektriker 0..* <--> 0..* lagerbiler 
*/

export default class Electrician {
    constructor(navn) {
        this.navn = navn
    }

    addVan(van) {
        this.van = van
    }
}
