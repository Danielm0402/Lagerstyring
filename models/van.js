/*
    elektriker 0..* <--> 0..* lagerbiler 
*/

/*
    product 0..* <-- 1 lagerbil
*/

export default class Van {
    constructor(licenseplate, vanOwner) {
        this.licenseplate = licenseplate
        this.vanOwner = vanOwner
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

