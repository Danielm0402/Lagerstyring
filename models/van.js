/*
    elektriker 0..* <--> 0..* lagerbiler 
*/

/*
    product 0..* komposition 1 lagerbil
*/

export default class Van {
    constructor(licensePlate, owner) {
        this.licensePlate = licensePlate
        this.owner = owner
        this.products = []
    }

    addProduct(product) {
        this.products.push(product)
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

    toJSON() {
        return {licensePlate: this.licensePlate, owner: this.owner, products: this.products}
    }
}

