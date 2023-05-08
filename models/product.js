
/*
    product 0..* komposition 1 lagerbil
*/

class Product {
    constructor(name, amount, unit, van) {
        this.name = name
        this.amount = amount
        this.unit = unit
        this.van = van
    }

    toJSON() {
        const json = {
            name: this.name,
            amount: this.amount,
            unit: this.unit,
            van: this.van.licensePlate
        }
        return { 
              }
    }
}