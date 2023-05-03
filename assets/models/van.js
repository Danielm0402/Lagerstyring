/*
    elektriker 0..* <--> 0..* lagerbiler 
*/

/*
    product 0..* komposition 1 lagerbil
*/

export default class Van {
    constructor(licensePlate, owner, vanKey) {
        this.licensePlate = licensePlate
        this.vanKey = vanKey
        this.owner = owner
    }

    createProduct(name, amount, unit){
        let newProduct = new product(name, amount, unit)
        this.products.push(newProduct)
        return newProduct
    }

    removeProduct(product){
        if(this.products.includes(product)){
            this.products.slice(this.products.indexOf(product), 1)
        }
    }
}

