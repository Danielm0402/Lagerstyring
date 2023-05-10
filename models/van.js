/*
    elektriker 0..* <--> 0..* lagerbiler 
*/

/*
    product 0..* komposition 1 lagerbil
*/

export default class Van {

    constructor(licensePlate) {
        this.licensePlate = licensePlate;
        this.users = []
        this.products = []
    }

    addUser(user) {
        if(!this.user.includes(user)) {
            this.user.push(user);
        }
    }

    removeUser(user) {
        const index = this.users.findIndex(user);

        if (index > -1)
            this.users.splice(index, 1);
    }

    addProduct(product) {
        if (!this.products.includes(product)) {
            this.products.push(product)
        }
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
            users: this.users.map(e => e.employeeId),
            products: this.products.map(p => p.name)
        }
        return json;
    }
}

