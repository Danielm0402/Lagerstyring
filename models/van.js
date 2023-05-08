/*
    elektriker 0..* <--> 0..* lagerbiler 
*/

/*
    product 0..* komposition 1 lagerbil
*/

export default class Van {
    constructor(licensePlate) {
        this.licensePlate = licensePlate
        this.electricians = [];
        this.products = []
    }

    addElectrician(electrician) {
        if(!this.electricians.includes(electrician)) {
            this.electricians.push(electrician);
        }
    }

    removeElectrician(electrician) {
        const index = this.electricians.findIndex(electrician);

        if (index > -1)
            this.electricians.splice(index, 1);
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
        const json = {
            licensePlate: this.licensePlate,
            electricians: this.electricians.map(e => e.employeeId),
            products: this.products.map(p => p.name)
        }
        return json;
    }
}

