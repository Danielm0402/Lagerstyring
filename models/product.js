
/*
    product 0..* komposition 1 lagerbil
*/

class Product {
    constructor(name, amount, unit, licensePlate) {
        this.name = name
        this.amount = amount
        this.unit = unit
        this.licenseplate = licensePlate
    }

    toJSON() {
        return {name: this.name, amount: this.amount, unit: this.unit, licensePlate: this.licensePlate}
    }
}