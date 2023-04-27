/*
    elektriker 0..* <--> 0..* lagerbiler 
*/

/*
    vare 0..* <-- 1 lagerbil
*/

export class Van {
    constructor(licenseplate) {
        this.licenseplate = licenseplate
        this.products = []
        this.electricians = []
    }

    addElectrician(electrician) {
        this.electricians.push(electrician)
    }

    addProduct(product) {
        this.products.push(product)
    }
}